import rawCatalog from '../../content/catalog.json'
import rawTaxonomy from '../../content/taxonomy.json'
import type { Dataset, Filters, TaxonomyGroup } from './types'

export const catalog = rawCatalog as Dataset[]
export const taxonomy = rawTaxonomy as TaxonomyGroup[]

// Stable ordering by title
catalog.sort((a, b) => (a.title || '').localeCompare(b.title || ''))

export const bySlug = new Map(catalog.map((d) => [d.slug, d]))
export const byId = new Map(catalog.map((d) => [d.id, d]))

export const CONTENT_TYPES = Array.from(
  new Set(catalog.map((d) => d.content_type).filter(Boolean) as string[]),
).sort()

export function categoryCounts(): Record<string, number> {
  const c: Record<string, number> = {}
  for (const d of catalog) if (d.category) c[d.category] = (c[d.category] || 0) + 1
  return c
}

export function contentTypeCounts(): Record<string, number> {
  const c: Record<string, number> = {}
  for (const d of catalog) if (d.content_type) c[d.content_type] = (c[d.content_type] || 0) + 1
  return c
}

export const stats = {
  datasets: catalog.length,
  categories: new Set(catalog.map((d) => d.category).filter(Boolean)).size,
  countries: new Set(catalog.map((d) => d.country).filter(Boolean)).size,
  geolocated: catalog.filter((d) => d.lat != null && d.lng != null).length,
}

export const geoData = catalog.filter(
  (d) => d.lat != null && d.lng != null,
) as (Dataset & { lat: number; lng: number })[]

function haystack(d: Dataset): string {
  return [d.title, d.description, d.author, d.publishing_org, d.country, d.category, d.subcategory, ...d.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function search(filters: Filters): Dataset[] {
  const terms = filters.q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return catalog.filter((d) => {
    if (filters.categories.length && (!d.category || !filters.categories.includes(d.category))) return false
    if (filters.contentTypes.length && (!d.content_type || !filters.contentTypes.includes(d.content_type))) return false
    if (terms.length) {
      const h = haystack(d)
      if (!terms.every((t) => h.includes(t))) return false
    }
    return true
  })
}
