// Cloudflare Pages Function: POST /api/signup
// 1) stores the submission in D1 (mini-CRM)
// 2) opens a GitHub issue so the team gets an alert + a follow-up/approval workflow
//
// Runtime config (set in the Cloudflare Pages project, NOT in code):
//   - D1 binding:   DB            (database: geo4dev-signups)
//   - Variable:     ISSUE_REPO    e.g. "g4d-nlt-cega-3ie/open-data"
//   - Secret:       GITHUB_TOKEN  fine-grained token, Issues: read+write on ISSUE_REPO

interface Env {
  DB?: D1Database
  GITHUB_TOKEN?: string
  ISSUE_REPO?: string
}

const TYPES = ['alert', 'contact', 'submission'] as const
type SubType = (typeof TYPES)[number]

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: any
  try {
    data = await request.json()
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 })
  }

  const email = (data.email ?? '').toString().trim()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'valid email required' }, { status: 400 })
  }

  const type: SubType = (TYPES as readonly string[]).includes(data.type) ? data.type : 'alert'
  const name = (data.name ?? '').toString().trim()
  const organization = (data.organization ?? '').toString().trim()
  const interest = (data.interest ?? '').toString().trim()
  const message = (data.message ?? '').toString().trim()
  const link = (data.link ?? '').toString().trim()
  const created = new Date().toISOString()

  // 1) Store in D1 (best-effort)
  let stored = false
  if (env.DB) {
    try {
      await env.DB.prepare(
        `insert into signups (type, email, name, organization, interest, message, link, created_at)
         values (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(type, email, name || null, organization || null, interest || null, message || null, link || null, created)
        .run()
      stored = true
    } catch {
      /* fall through — issue creation may still succeed */
    }
  }

  // 2) Open a GitHub issue (best-effort)
  let issueUrl: string | null = null
  if (env.GITHUB_TOKEN && env.ISSUE_REPO) {
    const heading =
      type === 'submission' ? 'New submission' : type === 'contact' ? 'New contact message' : 'New alert signup'
    const title = `[${type}] ${heading} — ${name || email}`
    const body = [
      `**Type:** ${type}`,
      `**Email:** ${email}`,
      name ? `**Name:** ${name}` : null,
      organization ? `**Organization:** ${organization}` : null,
      interest ? `**Interest:** ${interest}` : null,
      link ? `**Link:** ${link}` : null,
      message ? `\n${message}` : null,
      `\n<sub>Submitted ${created} via geo4dev.nltgis.ai</sub>`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch(`https://api.github.com/repos/${env.ISSUE_REPO}/issues`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'geo4dev-site',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, labels: [type, 'status:new'] }),
      })
      if (res.ok) {
        const j = await res.json<any>()
        issueUrl = j.html_url
      }
    } catch {
      /* ignore — submission may still be stored in D1 */
    }
  }

  if (!stored && !issueUrl) {
    return Response.json({ error: 'not configured' }, { status: 500 })
  }
  return Response.json({ ok: true, issue: issueUrl })
}
