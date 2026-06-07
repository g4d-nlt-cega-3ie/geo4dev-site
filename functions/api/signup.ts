// Cloudflare Pages Function: POST /api/signup
// Opens a GitHub issue in the PRIVATE intake repo. No datastore, no email.
// Hardened: size/length caps, honeypot, http(s)-only link, optional Turnstile.
//
// Runtime config (Pages dashboard secrets + wrangler.toml [vars]):
//   Variable: INTAKE_REPO       = "g4d-nlt-cega-3ie/geo4dev-intake"
//   Secret:   GITHUB_TOKEN      = fine-grained, Issues: write on INTAKE_REPO
//   Secret:   TURNSTILE_SECRET  = Cloudflare Turnstile secret (optional; if set, enforced)

interface Env {
  GITHUB_TOKEN?: string
  INTAKE_REPO?: string
  TURNSTILE_SECRET?: string
}

const TYPES = ['contact', 'submission'] as const
type SubType = (typeof TYPES)[number]
const MAX_BODY = 16_000 // bytes
const clamp = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n)

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // size guard
  const len = Number(request.headers.get('content-length') || 0)
  if (len && len > MAX_BODY) return Response.json({ error: 'payload too large' }, { status: 413 })

  let data: any
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return Response.json({ error: 'payload too large' }, { status: 413 })
    data = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 })
  }

  // honeypot: real users never fill this; silently accept + drop
  if (clamp(data.company, 200)) return Response.json({ ok: true })

  const email = clamp(data.email, 320)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'valid email required' }, { status: 400 })
  }

  // optional bot check
  if (env.TURNSTILE_SECRET) {
    const token = clamp(data.turnstileToken, 4000)
    if (!token) return Response.json({ error: 'verification required' }, { status: 403 })
    try {
      const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET,
          response: token,
          remoteip: request.headers.get('cf-connecting-ip') || undefined,
        }),
      })
      const vr = (await v.json()) as any
      if (!vr.success) return Response.json({ error: 'verification failed' }, { status: 403 })
    } catch {
      return Response.json({ error: 'verification failed' }, { status: 403 })
    }
  }

  const type: SubType = (TYPES as readonly string[]).includes(data.type) ? data.type : 'contact'
  const name = clamp(data.name, 200)
  const organization = clamp(data.organization, 200)
  const interest = clamp(data.interest, 80)
  const message = clamp(data.message, 5000)
  let link = clamp(data.link, 500)
  if (link && !/^https?:\/\//i.test(link)) link = '' // http(s) only
  const created = new Date().toISOString()

  if (!env.GITHUB_TOKEN || !env.INTAKE_REPO) {
    return Response.json({ error: 'not configured' }, { status: 500 })
  }

  const heading = type === 'submission' ? 'New submission' : 'New contact message'
  const title = `[${type}] ${heading} — ${(name || email).slice(0, 80)}`
  const body = [
    `**Type:** ${type}`,
    `**Email:** ${email}`,
    name ? `**Name:** ${name}` : null,
    organization ? `**Organization:** ${organization}` : null,
    interest ? `**Interest:** ${interest}` : null,
    link ? `**Link:** ${link}` : null,
    message ? `\n${message}` : null,
    `\n<sub>Submitted ${created} via the Geo4Dev site. Contains personal data — keep in this private repo.</sub>`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const res = await fetch(`https://api.github.com/repos/${env.INTAKE_REPO}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'geo4dev-site',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, labels: [type, 'status:new'] }),
    })
    if (!res.ok) return Response.json({ error: 'intake failed' }, { status: 502 })
  } catch {
    return Response.json({ error: 'intake failed' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
