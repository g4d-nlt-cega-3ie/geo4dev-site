import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeckMap from '../map/DeckMap'
import { geoData } from '../lib/catalog'
import type { Dataset } from '../lib/types'

type GeoDataset = Dataset & { lat: number; lng: number }

export default function MapPage() {
  const [selected, setSelected] = useState<GeoDataset | null>(null)

  return (
    <main className="map-wrap">
      <DeckMap data={geoData} onSelect={setSelected} selectedId={selected?.id} />
      <div className="map-panel">
        <span className="eyebrow">Map</span>
        <h3>{geoData.length} geolocated entries</h3>
        <p className="muted" style={{ fontSize: '0.86rem' }}>
          Click a point to inspect. Drag to pan, scroll to zoom.
        </p>
        {selected ? (
          <div style={{ marginTop: '0.6rem' }}>
            <div className="tags-row">
              {selected.content_type && <span className="pill">{selected.content_type}</span>}
            </div>
            <h3 style={{ fontSize: '1.05rem' }}>{selected.title}</h3>
            {selected.country && <div className="muted" style={{ fontSize: '0.84rem' }}>{selected.country}</div>}
            <Link to={`/dataset/${selected.slug}`} className="btn ghost" style={{ marginTop: '0.7rem', fontSize: '0.85rem' }}>
              View details →
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: '0.6rem' }}>
            {geoData.slice(0, 30).map((d) => (
              <div key={d.id} className="mp-item" onClick={() => setSelected(d)}>
                {d.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
