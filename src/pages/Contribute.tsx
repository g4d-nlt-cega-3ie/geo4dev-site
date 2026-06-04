import { Link } from 'react-router-dom'
import { GITHUB_OPEN_DATA } from '../lib/assets'

const SITE_REPO = 'https://github.com/g4d-nlt-cega-3ie/geo4dev-site'
const DISCUSSIONS = 'https://github.com/g4d-nlt-cega-3ie/open-data/discussions'

export default function Contribute() {
  return (
    <main className="page section">
      <div className="container">
        <div className="prose">
          <span className="eyebrow">Contribute</span>
          <h2>Help grow the open library</h2>
          <p>
            Geo4Dev is built in the open. Whether you're a researcher with a publication to share
            or a developer who wants to improve the platform, there's a path for you. Pick the one
            that fits.
          </p>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Add a publication or dataset</h3>
        <p className="muted" style={{ maxWidth: 760 }}>
          Researchers can get their work into the catalog in whichever way is easiest.
        </p>
        <div className="feature-grid">
          <div className="feature">
            <h3>Link an existing resource</h3>
            <p>
              Already published somewhere? Submit the link and core details — title, authors,
              location, and a short description — and we'll catalog it with attribution back to the
              source.
            </p>
          </div>
          <div className="feature">
            <h3>Register &amp; submit</h3>
            <p>
              For new or unpublished material, register and go through a short submission and
              review so the entry is described consistently and is easy to discover.
            </p>
          </div>
          <div className="feature">
            <h3>Contribute on GitHub</h3>
            <p>Comfortable with Git? Add your entry directly in the open data repository.</p>
            <ol className="steps">
              <li>Open the open-data repository.</li>
              <li>Open a submission issue, or add a record and open a pull request.</li>
              <li>A maintainer reviews and merges — it then appears in the library.</li>
            </ol>
            <p style={{ marginTop: '0.7rem' }}>
              <a href={GITHUB_OPEN_DATA} target="_blank" rel="noreferrer">Open data repository ↗</a>
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: '2.4rem' }}>Improve the platform</h3>
        <p className="muted" style={{ maxWidth: 760 }}>
          The site is open source. Code contributions and new functionality are welcome.
        </p>
        <div className="feature-grid">
          <div className="feature">
            <h3>Submit code &amp; features</h3>
            <p>
              Fix a bug, refine the interface, or build new capability — the map, search, and
              catalog views are all extendable. Fork the site repository, make your change, and
              open a pull request for review.
            </p>
            <p style={{ marginTop: '0.7rem' }}>
              <a href={SITE_REPO} target="_blank" rel="noreferrer">Site repository ↗</a>
            </p>
          </div>
          <div className="feature">
            <h3>Discuss &amp; review</h3>
            <p>
              Propose ideas, ask questions, and help review submissions in Discussions. Good
              proposals often start as a conversation before any code or data changes.
            </p>
            <p style={{ marginTop: '0.7rem' }}>
              <a href={DISCUSSIONS} target="_blank" rel="noreferrer">Open discussions ↗</a>
            </p>
          </div>
        </div>

        <div className="callout">
          <h3>Follow what's new</h3>
          <p style={{ marginBottom: '0.8rem' }}>
            Get email alerts when datasets, publications, and platform releases go live, and review
            the changelog any time.
          </p>
          <Link to="/contact" className="btn">Get alerts</Link>{' '}
          <Link to="/releases" className="btn ghost">Release notes</Link>
        </div>
      </div>
    </main>
  )
}
