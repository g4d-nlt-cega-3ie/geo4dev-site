export default function About() {
  return (
    <main className="page section">
      <div className="container prose">
        <span className="eyebrow">About</span>
        <h2>An open library for geospatial development evidence</h2>
        <p>
          Geo4Dev brings together geospatial datasets, peer-reviewed publications,
          and training resources that connect satellite and remote-sensing data to
          questions in development economics, impact evaluation, and public policy.
        </p>
        <p>
          The platform is open by design: the catalog is public, version-controlled,
          and built for the research community to use and contribute to. There is no
          login wall to browse — everything here is meant to be found, cited, and built on.
        </p>
        <h3 style={{ marginTop: '1.6rem' }}>Partners</h3>
        <p>
          Geo4Dev is a collaboration of New Light Technologies (NLT), the Center for
          Effective Global Action (CEGA) at UC Berkeley, and the International
          Initiative for Impact Evaluation (3ie).
        </p>
        <h3 style={{ marginTop: '1.6rem' }}>Contribute</h3>
        <p>
          A community contribution workflow — for submitting datasets, publications,
          and training, and for sharing feedback — is opening soon. Want to be
          notified? Head to the <a href="/contact">updates</a> page.
        </p>
      </div>
    </main>
  )
}
