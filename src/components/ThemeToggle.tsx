import { useEffect, useState } from 'react'

type Theme = 'dark' | 'gray' | 'light'
const THEMES: Theme[] = ['dark', 'gray', 'light']
const LABELS: Record<Theme, string> = { dark: 'Dark', gray: 'Gray', light: 'Light' }

function current(): Theme {
  const t = document.documentElement.dataset.theme as Theme
  return THEMES.includes(t) ? t : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t}
          className={theme === t ? 'active' : ''}
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
        >
          {LABELS[t]}
        </button>
      ))}
    </div>
  )
}
