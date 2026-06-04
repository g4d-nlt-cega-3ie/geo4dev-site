import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { taxonomy, categoryCounts } from '../lib/catalog'
import { LOGO_GEO4DEV, LOGO_GEO4DEV_LIGHT } from '../lib/assets'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const [openCats, setOpenCats] = useState(false)
  const counts = categoryCounts()
  const navigate = useNavigate()

  function goCat(cat: string) {
    setOpenCats(false)
    navigate(`/library?cat=${encodeURIComponent(cat)}`)
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <img src={LOGO_GEO4DEV} alt="Geo4Dev" className="brand-logo for-dark" />
          <img src={LOGO_GEO4DEV_LIGHT} alt="Geo4Dev" className="brand-logo for-light" />
        </Link>
        <nav className="nav-links">
          <div
            className="has-mega"
            onMouseEnter={() => setOpenCats(true)}
            onMouseLeave={() => setOpenCats(false)}
          >
            <button className="nav-trigger" onClick={() => setOpenCats((v) => !v)}>
              Categories <span className="caret">▾</span>
            </button>
            {openCats && (
              <div className="mega">
                {taxonomy.map((g) => (
                  <div key={g.category} className="mega-col">
                    <button className="mega-head" onClick={() => goCat(g.category)}>
                      {g.category} <span className="mega-count">{counts[g.category] || 0}</span>
                    </button>
                    {g.subcategories.map((s) => (
                      <button key={s} className="mega-sub" onClick={() => goCat(g.category)}>
                        {s}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/training">Training</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contribute">Contribute</NavLink>
          <NavLink to="/about">About</NavLink>
          <ThemeToggle />
          <NavLink to="/contact" className="nav-cta">Get alerts</NavLink>
        </nav>
      </div>
    </header>
  )
}
