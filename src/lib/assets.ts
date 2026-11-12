// Geo4Dev branding is self-hosted in /public/logos/.
// Partner logos are optional: when `logo` is not set the partner name is shown
// as text. To add one, drop the file into /public/logos/ and set e.g.
// logo: '/logos/nlt.png'. Do not load logos from third-party hosts.
export const LOGO_GEO4DEV = '/logos/geo4dev-dark.svg'
export const LOGO_GEO4DEV_LIGHT = '/logos/geo4dev-light.svg'

export type Partner = { name: string; href: string; logo?: string }

export const PARTNERS: Partner[] = [
  { name: 'CEGA', href: 'https://cega.berkeley.edu' },
  { name: 'New Light Technologies', href: 'https://newlighttechnologies.com' },
  { name: '3ie', href: 'https://3ieimpact.org' },
]

export const NLT_LOGO: string | undefined = undefined

// "Open science on GitHub" — the public community/open-data repository.
export const GITHUB_OPEN_DATA = 'https://github.com/g4d-nlt-cega-3ie/open-data'
export const GITHUB_LEGACY = 'https://github.com/NLTGit/Geo4Dev'
export const LINKEDIN_GROUP = 'https://www.linkedin.com/groups/12481308/'
