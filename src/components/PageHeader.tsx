interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
}

export default function PageHeader({ eyebrow, title, subtitle, image }: Props) {
  return (
    <div className="page-header" style={{ ['--ph-image' as string]: `url(${image})` } as React.CSSProperties}>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {subtitle && <p className="ph-sub">{subtitle}</p>}
    </div>
  )
}
