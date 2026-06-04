import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import DatasetCard from '../components/DatasetCard'
import { stats, taxonomy, categoryCounts, catalog } from '../lib/catalog'
import { PARTNERS } from '../lib/assets'

export default function Home() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const counts = categoryCounts()

  const featured = catalog
    .filter((d) => d.lat != null && d.description && d.description.length > 60)
    .slice(0, 4)
  const learning = catalog.filter(
    (d) => d.content_type === 'Training Materials' || d.content_type === 'Books',
  ).slice(0, 3)

  function go() {
    navigate(`/library?q=${encodeURIComponent(q)}`)
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">Geospatial Analysis for Development Initiative</span>
          <h1>Geospatial evidence for development &amp; impact.</h1>
          <p className="lead">
            Search timely, curated datasets, publications, and training — connecting
            remote sensing and geospatial methods to real-world development questions.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); go() }}>
            <SearchBar value={q} onChange={setQ} />
          </form>
          <div className="stats">
            <div className="stat"><div className="n">{stats.datasets}</div><div className="l">Catalog entries</div></div>
            <div className="stat"><div className="n">{stats.categories}</div><div className="l">Categories</div></div>
            <div className="stat"><div className="n">{stats.geolocated}</div><div className="l">On the map</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Browse by category</h2>
            <Link to="/library" className="btn ghost">View full library →</Link>
          </div>
          <div className="cat-grid">
            {taxonomy.map((g) => (
              <Link key={g.category} to={`/library?cat=${encodeURIComponent(g.category)}`} className="cat-card">
                <div className="cn">{g.category}</div>
                <div className="cc">{counts[g.category] || 0} entries</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Featured datasets</h2>
            <Link to="/library" className="btn ghost">Explore all →</Link>
          </div>
          <div className="card-list">
            {featured.map((d) => <DatasetCard key={d.id} d={d} />)}
          </div>
        </div>
      </section>

      {learning.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Learning materials</h2>
              <Link to="/training" className="btn ghost">All training →</Link>
            </div>
            <div className="card-list">
              {learning.map((d) => <DatasetCard key={d.id} d={d} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section section-partners">
        <div className="container">
          <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>In collaboration</span>
          <div className="partner-strip">
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" title={p.name}>
                <img src={p.logo} alt={`${p.name} logo`} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
