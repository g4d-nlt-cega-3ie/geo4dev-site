import DatasetCard from '../components/DatasetCard'
import PageHeader from '../components/PageHeader'
import { catalog } from '../lib/catalog'

export default function Training() {
  const training = catalog.filter(
    (d) => d.content_type === 'Training Materials' || d.content_type === 'Books',
  )
  return (
    <main className="page section">
      <div className="container">
        <PageHeader
          eyebrow="Training"
          title="Learning materials"
          subtitle="Tutorials, courses, and reference material for applying geospatial and remote-sensing methods to development research."
          image="/images/india-lights.jpg"
        />
        <div className="card-list" style={{ marginTop: '1.4rem' }}>
          {training.map((d) => (
            <DatasetCard key={d.id} d={d} />
          ))}
          {training.length === 0 && <p className="muted">More training materials coming soon.</p>}
        </div>
      </div>
    </main>
  )
}
