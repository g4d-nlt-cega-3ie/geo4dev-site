// Cloudflare Pages Function: POST /api/signup -> insert into D1 (mini-CRM)
interface Env { DB: D1Database }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { name, email, organization, interest, message } = await request.json<any>()
    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'email required' }, { status: 400 })
    }
    await env.DB.prepare(
      `insert into signups (email, name, organization, interest, message) values (?, ?, ?, ?, ?)`,
    )
      .bind(email, name ?? null, organization ?? null, interest ?? 'updates', message ?? null)
      .run()
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: 'failed' }, { status: 500 })
  }
}
