import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', organization: '', interest: 'updates', message: '' })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
          <span className="eyebrow">Updates</span>
          <h2>You're on the list.</h2>
          <p>Thanks — we'll be in touch when the platform and contribution tools go live.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="page section">
      <div className="container prose">
        <span className="eyebrow">Updates</span>
        <h2>Get notified at launch</h2>
        <p className="muted">
          Geo4Dev is being rebuilt as a fully open platform. Leave your details to
          hear when it launches, or to flag interest in contributing data,
          publications, or training.
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
              <option value="updates">Launch updates</option>
              <option value="contribute-data">Contributing data</option>
              <option value="contribute-publication">Contributing a publication</option>
              <option value="contribute-training">Contributing training</option>
              <option value="feedback">Giving feedback</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Notify me'}
          </button>
          {status === 'error' && (
            <p style={{ color: 'var(--rust)', fontSize: '0.88rem', marginTop: '0.7rem' }}>
              Something went wrong. The signup endpoint may not be wired up yet.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
