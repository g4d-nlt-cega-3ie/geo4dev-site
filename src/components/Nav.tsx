import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand"><Logo /> Geo4Dev</Link>
        <nav className="nav-links">
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/training">Training</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact" className="nav-cta">Get updates</NavLink>
        </nav>
      </div>
    </header>
  )
}
