import { Link } from 'react-router-dom'
import type { Dataset } from '../lib/types'

export default function DatasetCard({ d }: { d: Dataset }) {
  return (
    <Link to={`/dataset/${d.slug}`} className="dcard">
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
  )
}
