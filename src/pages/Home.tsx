import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { stats, taxonomy, categoryCounts } from '../lib/catalog'

export default function Home() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const counts = categoryCounts()

  function go() {
    navigate(`/library?q=${encodeURIComponent(q)}`)
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">Open-science geospatial platform</span>
          <h1>Geospatial evidence for development &amp; impact.</h1>
          <p className="lead">
            A curated, open library of datasets, publications, and training —
            connecting remote sensing and geospatial methods to real-world
            development questions.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              go()
            }}
          >
            <SearchBar value={q} onChange={setQ} />
          </form>
          <div className="stats">
            <div className="stat">
              <div className="n">{stats.datasets}</div>
              <div className="l">Catalog entries</div>
            </div>
            <div className="stat">
              <div className="n">{stats.categories}</div>
              <div className="l">Categories</div>
            </div>
            <div className="stat">
              <div className="n">{stats.geolocated}</div>
              <div className="l">On the map</div>
            </div>
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
              <Link
                key={g.category}
                to={`/library?cat=${encodeURIComponent(g.category)}`}
                className="cat-card"
              >
                <div className="cn">{g.category}</div>
                <div className="cc">{counts[g.category] || 0} entries</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
