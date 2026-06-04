import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="cols">
          <div style={{ maxWidth: 320 }}>
            <h4>Geo4Dev</h4>
            <p style={{ color: '#cfe0db', fontSize: '0.9rem' }}>
              An open library of geospatial data, publications, and training for
              development and impact evaluation.
            </p>
          </div>
          <div className="fcol">
            <h4>Explore</h4>
            <Link to="/library">Library</Link>
            <Link to="/map">Map</Link>
            <Link to="/training">Training</Link>
          </div>
          <div className="fcol">
            <h4>Project</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Get updates</Link>
            <a href="https://github.com/g4d-nlt-cega-3ie" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="fcol">
            <h4>Partners</h4>
            <span style={{ color: '#cfe0db', fontSize: '0.9rem', display: 'block' }}>NLT · CEGA · 3ie</span>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} Geo4Dev. Open data under their respective licenses.</div>
      </div>
    </footer>
  )
}
