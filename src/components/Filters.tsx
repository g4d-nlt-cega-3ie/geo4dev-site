import { taxonomy, categoryCounts, contentTypeCounts, CONTENT_TYPES } from '../lib/catalog'

interface Props {
  categories: string[]
  contentTypes: string[]
  onToggleCategory: (c: string) => void
  onToggleContentType: (c: string) => void
  onClear: () => void
}

export default function Filters({
  categories,
  contentTypes,
  onToggleCategory,
  onToggleContentType,
  onClear,
}: Props) {
  const catCounts = categoryCounts()
  const ctCounts = contentTypeCounts()
  const active = categories.length + contentTypes.length

  return (
    <aside className="facets">
      <div className="facet-group">
        <h4>Content type</h4>
        {CONTENT_TYPES.map((ct) => (
          <label key={ct} className="facet">
            <input
              type="checkbox"
              checked={contentTypes.includes(ct)}
              onChange={() => onToggleContentType(ct)}
            />
            {ct}
            <span className="fc">{ctCounts[ct] || 0}</span>
          </label>
        ))}
      </div>

      <div className="facet-group">
        <h4>Category</h4>
        {taxonomy.map((g) => (
          <label key={g.category} className="facet">
            <input
              type="checkbox"
              checked={categories.includes(g.category)}
              onChange={() => onToggleCategory(g.category)}
            />
            {g.category}
            <span className="fc">{catCounts[g.category] || 0}</span>
          </label>
        ))}
      </div>

      {active > 0 && (
        <button className="btn ghost" onClick={onClear} style={{ fontSize: '0.85rem' }}>
          Clear filters ({active})
        </button>
      )}
    </aside>
  )
}
