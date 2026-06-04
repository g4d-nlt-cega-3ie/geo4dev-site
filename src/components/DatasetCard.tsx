import { Link } from 'react-router-dom'
import type { Dataset } from '../lib/types'

export default function DatasetCard({ d }: { d: Dataset }) {
  const geo = d.lat != null && d.lng != null
  return (
    <div className="dcard">
      <Link to={`/dataset/${d.slug}`} className="dcard-main">
        <div className="tags-row">
          {d.content_type && <span className="pill">{d.content_type}</span>}
          {d.category && <span className="pill cat">{d.category}</span>}
        </div>
        <h3>{d.title}</h3>
        {d.description && <p>{d.description}</p>}
        <div className="meta">
          {d.author && <span>{d.author}</span>}
          {d.author && d.country && <span> · </span>}
          {d.country && <span>{d.country}</span>}
        </div>
      </Link>
      <div className="dcard-foot">
        {geo ? (
          <Link to={`/map?focus=${encodeURIComponent(d.slug)}`} className="mapit">◉ Map it</Link>
        ) : (
          <span className="mapit off" title="No coordinates for this entry">◌ Not mapped</span>
        )}
        <Link to={`/dataset/${d.slug}`} className="dcard-detail">Details →</Link>
      </div>
    </div>
  )
}
