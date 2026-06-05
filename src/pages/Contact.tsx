import { useState } from 'react'

type Interest = 'updates' | 'contribute-data' | 'contribute-publication' | 'contribute-training' | 'feedback'

function typeFor(interest: string): 'alert' | 'contact' | 'submission' {
  if (interest === 'updates') return 'alert'
  if (interest === 'feedback') return 'contact'
  return 'submission'
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', organization: '', interest: 'updates' as Interest, message: '', link: '' })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const isContribute = form.interest.startsWith('contribute')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: typeFor(form.interest) }),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <main className="page section">
        <div className="container prose">
          <span className="eyebrow">Thanks</span>
          <h2>Got it — you're on the list.</h2>
          <p>We've logged your details and notified the team. We'll be in touch about new datasets, publications, and releases.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="page section">
      <div className="container prose">
        <span className="eyebrow">Alerts &amp; contact</span>
        <h2>Get alerts &amp; get in touch</h2>
        <p className="muted">
          Leave your details to hear when new datasets, publications, and releases go live —
          or to flag a resource you'd like to contribute. Submissions notify the team directly.
        </p>
        <form onSubmit={submit} style={{ maxWidth: 480, marginTop: '1.2rem' }}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="org">Organization</label>
            <input id="org" value={form.organization} onChange={(e) => set('organization', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="interest">I'm interested in</label>
            <select id="interest" value={form.interest} onChange={(e) => set('interest', e.target.value)}>
              <option value="updates">Alerts &amp; launch updates</option>
              <option value="contribute-data">Contributing data</option>
              <option value="contribute-publication">Contributing a publication</option>
              <option value="contribute-training">Contributing training</option>
              <option value="feedback">Giving feedback</option>
            </select>
          </div>
          {isContribute && (
            <div className="field">
              <label htmlFor="link">Link to the resource</label>
              <input id="link" type="url" placeholder="https://…" value={form.link} onChange={(e) => set('link', e.target.value)} />
            </div>
          )}
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#ef4444', fontSize: '0.88rem', marginTop: '0.7rem' }}>
              Something went wrong. The submission endpoint may not be fully configured yet.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
