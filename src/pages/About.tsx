import { Link } from 'react-router-dom'
import { GITHUB_OPEN_DATA } from '../lib/assets'

const LOGOS: Record<string, string> = {
  NLT: 'https://geo4dev-resources.s3.amazonaws.com/logos/nlt.png',
  CEGA: 'https://geo4dev-resources.s3.amazonaws.com/logos/cega.png',
  '3ie': 'https://geo4dev-resources.s3.amazonaws.com/logos/3ie.png',
}

const MEMBERS = [
  {
    name: 'New Light Technologies (NLT)',
    logo: LOGOS.NLT,
    site: 'https://newlighttechnologies.com',
    siteLabel: 'newlighttechnologies.com',
    blurb:
      'A Washington, DC–based integrated consulting firm spanning geospatial and remote sensing, data science and AI, software and systems engineering, cloud, cybersecurity, and research. For roughly 24 years NLT has delivered mission-focused solutions for federal, state and local, commercial, and non-profit organizations — and it builds and maintains the Geo4Dev platform.',
  },
  {
    name: 'Center for Effective Global Action (CEGA)',
    logo: LOGOS.CEGA,
    site: 'https://cega.berkeley.edu',
    siteLabel: 'cega.berkeley.edu',
    blurb:
      'A research network headquartered at UC Berkeley that generates rigorous evidence on global poverty and development. Its work includes Data Science for Development — applying remote sensing, machine learning, and big data to measure poverty and inequality more accurately, frequently, and at finer geographic detail.',
  },
  {
    name: 'International Initiative for Impact Evaluation (3ie)',
    logo: LOGOS['3ie'],
    site: 'https://www.3ieimpact.org',
    siteLabel: '3ieimpact.org',
    blurb:
      'A global organization advancing evidence-informed development under the banner “evidence that improves lives.” 3ie provides impact-evaluation services and products and maintains the Development Evidence Portal, a large, growing repository of rigorous evidence on what works in international development.',
  },
]

export default function About() {
  return (
    <main className="page section">
      <div className="container">
        <div className="prose">
          <span className="eyebrow">About</span>
          <h2>An open library for geospatial development evidence</h2>
          <p>
            Geo4Dev brings together geospatial datasets, peer-reviewed publications, and
            training resources that connect satellite and remote-sensing data to questions in
            development economics, impact evaluation, and public policy.
          </p>
          <p>
            The platform is open by design: the catalog is public, version-controlled on GitHub,
            and built for the research community to use and contribute to. There is no login wall
            to browse — everything here is meant to be found, cited, and built on.
          </p>
        </div>

        <h3 style={{ marginTop: '2.6rem' }}>Primary members</h3>
        <p className="muted" style={{ maxWidth: 760 }}>
          Geo4Dev is a collaboration of three organizations working at the intersection of
          geospatial science and global development.
        </p>
        <div className="members">
          {MEMBERS.map((m) => (
            <div className="member" key={m.name}>
              <img className="member-logo" src={m.logo} alt={`${m.name} logo`} />
              <h3>{m.name}</h3>
              <p>{m.blurb}</p>
              <a className="site" href={m.site} target="_blank" rel="noreferrer">
                {m.siteLabel} ↗
              </a>
            </div>
          ))}
        </div>

        <div className="prose">
          <h3 style={{ marginTop: '2.6rem' }}>Built in the open</h3>
          <p>
            The site itself is open source. The catalog lives as structured, reviewable data in a
            public repository, and the application that renders it is community-extendable. That
            means anyone can propose a new dataset, fix a record, suggest a feature, or contribute
            code that improves the platform.
          </p>

          <h3 style={{ marginTop: '1.8rem' }}>Ways to contribute</h3>
          <p>There are several paths, depending on what you want to add:</p>
          <ul>
            <li>
              <strong>Add a publication or dataset</strong> — link an existing resource, go through
              a short registration and submission review, or open a request directly on GitHub.
            </li>
            <li>
              <strong>Improve the platform</strong> — propose code and new functionality through
              pull requests to the open site repository.
            </li>
            <li>
              <strong>Discuss and review</strong> — raise questions, flag issues, and help review
              community submissions.
            </li>
          </ul>
          <p>
            See the <Link to="/contribute">Contribute</Link> page for the details, or jump
            straight to the{' '}
            <a href={GITHUB_OPEN_DATA} target="_blank" rel="noreferrer">open repository ↗</a>.
          </p>

          <div className="callout">
            <h3>Stay in the loop</h3>
            <p style={{ marginBottom: '0.8rem' }}>
              Turn on email alerts to hear when new datasets, publications, and platform releases
              go live — and check the release notes for what's changed.
            </p>
            <Link to="/contact" className="btn">Get alerts</Link>{' '}
            <Link to="/releases" className="btn ghost">Release notes</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
