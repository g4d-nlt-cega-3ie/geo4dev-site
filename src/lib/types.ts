export interface Resource {
  url: string | null
  format: string | null
  name: string | null
}

export interface Dataset {
  id: string
  slug: string
  title: string
  description: string | null
  author: string | null
  category: string | null
  subcategory: string | null
  content_type: string | null
  country: string | null
  region_city: string | null
  lat: number | null
  lng: number | null
  license: string | null
  source_url: string | null
  stable_link: string | null
  publishing_org: string | null
  tags: string[]
  resources: Resource[]
}

export interface TaxonomyGroup {
  category: string
  subcategories: string[]
}

export interface Filters {
  q: string
  categories: string[]
  contentTypes: string[]
}
