import { Link } from 'react-router-dom'
import releases from '../../content/releases.json'

interface Release {
  version: string
  date: string
  title: string
  notes: string[]
}

export default function Releases() {
  const list = releases as Release[]
  return (
    <main className="page section">
      <div className="container prose">
        <span className="eyebrow">Release notes</span>
        <h2>What's new on Geo4Dev</h2>
        <p>
          A running log of platform releases and notable additions. Want to be notified as these
          ship? <Link to="/contact">Turn on alerts</Link>.
        </p>

        <div style={{ marginTop: '2rem' }}>
          {list.map((r) => (
            <div className="release" key={r.version}>
              <div>
                <span className="ver">v{r.version} — {r.title}</span>
                <span className="date">{r.date}</span>
              </div>
              <ul>
                {r.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
