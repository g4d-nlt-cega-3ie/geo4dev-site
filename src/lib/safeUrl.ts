// Allow only safe link schemes from content-derived URLs (blocks javascript:, data:, etc.)
export function safeUrl(u?: string | null): string | undefined {
  if (!u) return undefined
  const s = String(u).trim()
  if (/^https?:\/\//i.test(s) || /^mailto:/i.test(s)) return s
  return undefined
}
