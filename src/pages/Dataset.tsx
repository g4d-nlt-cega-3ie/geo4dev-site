import { useParams, Link } from 'react-router-dom'
import { bySlug } from '../lib/catalog'

export default function Dataset() {
  const { slug } = useParams()
  const d = slug ? bySlug.get(slug) : undefined

  if (!d) {
    return (
      <main className="page section">
        <div className="container">
          <p className="muted">Entry not found.</p>
          <Link to="/library" className="btn ghost">← Back to library</Link>
        </div>
      </main>
    )
  }

  const primaryLink = d.stable_link || d.source_url || d.resources.find((r) => r.url)?.url || null

  return (
    <main className="page section">
      <div className="container detail">
        <Link to="/library" className="back">← Library</Link>
        <div className="tags-row" style={{ marginTop: '0.8rem' }}>
          {d.content_type && <span className="pill">{d.content_type}</span>}
          {d.category && <span className="pill cat">{d.category}</span>}
          {d.subcategory && <span className="pill cat">{d.subcategory}</span>}
        </div>
        <h1>{d.title}</h1>
        {d.description && <p className="desc">{d.description}</p>}

        {primaryLink && (
          <a className="btn" href={primaryLink} target="_blank" rel="noreferrer">
            Open source ↗
          </a>
        )}

        <dl className="kv">
          {d.author && (<><dt>Author</dt><dd>{d.author}</dd></>)}
          {d.publishing_org && (<><dt>Organization</dt><dd>{d.publishing_org}</dd></>)}
          {d.country && (<><dt>Country</dt><dd>{d.country}{d.region_city ? ` · ${d.region_city}` : ''}</dd></>)}
          {d.license && (<><dt>License</dt><dd>{d.license}</dd></>)}
          {d.tags.length > 0 && (<><dt>Tags</dt><dd>{d.tags.join(', ')}</dd></>)}
        </dl>

        {d.resources.length > 0 && (
          <div style={{ marginTop: '1.6rem' }}>
            <h3>Resources</h3>
            {d.resources.map((r, i) => (
              <div className="res-item" key={i}>
                <span className="fmt">{r.format || 'LINK'}</span>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.name || r.url}
                  </a>
                ) : (
                  <span>{r.name || 'Resource'}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
