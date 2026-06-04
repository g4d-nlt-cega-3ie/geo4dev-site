import { useState, useMemo } from 'react'
import {
  Map,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
  GeolocateControl,
  AttributionControl,
  Popup,
  useControl,
} from 'react-map-gl/maplibre'
import type { StyleSpecification } from 'maplibre-gl'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { ScatterplotLayer } from '@deck.gl/layers'
import { Link } from 'react-router-dom'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Dataset } from '../lib/types'

export type GeoDataset = Dataset & { lat: number; lng: number }

// ---- Base layers (raster) the user can toggle ----
function raster(tiles: string[], attribution: string): StyleSpecification {
  return {
    version: 8,
    sources: { base: { type: 'raster', tiles, tileSize: 256, attribution } },
    layers: [{ id: 'base', type: 'raster', source: 'base' }],
  }
}
const BASEMAPS: Record<string, { label: string; style: StyleSpecification }> = {
  dark: { label: 'Dark', style: raster(
    ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png','https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png','https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
    '© OpenStreetMap © CARTO') },
  light: { label: 'Light', style: raster(
    ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png','https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png','https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'],
    '© OpenStreetMap © CARTO') },
  osm: { label: 'OpenStreetMap', style: raster(
    ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], '© OpenStreetMap contributors') },
  satellite: { label: 'Satellite', style: raster(
    ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
    'Imagery © Esri, Maxar, Earthstar Geographics') },
}

function DeckOverlay(props: { layers: any[] }) {
  const overlay = useControl(() => new MapboxOverlay({ interleaved: false, layers: props.layers }))
  overlay.setProps({ layers: props.layers })
  return null
}

interface Props {
  points: GeoDataset[]
  height?: string
  embedded?: boolean
  initialZoom?: number
  initialCenter?: [number, number]
}

export default function GeoMap({ points, height = '100%', embedded = false, initialZoom, initialCenter }: Props) {
  const [basemap, setBasemap] = useState(embedded ? 'light' : 'dark')
  const [showPoints, setShowPoints] = useState(true)
  const [pointSize, setPointSize] = useState(embedded ? 8 : 6)
  const [outline, setOutline] = useState(1.4)
  const [selected, setSelected] = useState<GeoDataset | null>(null)

  const center = initialCenter ?? (points.length === 1 ? [points[0].lng, points[0].lat] : [12, 18])
  const zoom = initialZoom ?? (points.length === 1 ? 4 : 1.4)

  const layers = useMemo(() => {
    if (!showPoints) return []
    return [
      new ScatterplotLayer<GeoDataset>({
        id: 'datasets',
        data: points,
        pickable: true,
        stroked: true,
        filled: true,
        radiusUnits: 'pixels',
        getPosition: (d) => [d.lng, d.lat],
        getRadius: (d) => (selected && d.id === selected.id ? pointSize + 3 : pointSize),
        getFillColor: (d) => (selected && d.id === selected.id ? [59, 130, 246, 255] : [37, 99, 235, 210]),
        getLineColor: [255, 255, 255, 230],
        lineWidthUnits: 'pixels',
        getLineWidth: outline,
        onClick: (info) => info.object && setSelected(info.object as GeoDataset),
        updateTriggers: {
          getRadius: [pointSize, selected?.id],
          getLineWidth: outline,
          getFillColor: selected?.id,
        },
      }),
    ]
  }, [points, showPoints, pointSize, outline, selected])

  return (
    <div className="geomap" style={{ height }}>
      <Map
        initialViewState={{ longitude: center[0], latitude: center[1], zoom }}
        mapStyle={BASEMAPS[basemap].style}
        attributionControl={false}
      >
        <DeckOverlay layers={layers} />
        <NavigationControl position="top-right" visualizePitch />
        {!embedded && <GeolocateControl position="top-right" />}
        {!embedded && <FullscreenControl position="top-right" />}
        <ScaleControl position="bottom-left" />
        <AttributionControl position="bottom-right" compact />

        {selected && (
          <Popup
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="bottom"
            offset={pointSize + 6}
            closeOnClick={false}
            onClose={() => setSelected(null)}
            maxWidth="300px"
          >
            <div className="map-popup">
              {selected.content_type && <span className="pill">{selected.content_type}</span>}
              <h4>{selected.title}</h4>
              {selected.country && <div className="mp-loc">{selected.country}{selected.region_city ? ` · ${selected.region_city}` : ''}</div>}
              {selected.description && <p>{selected.description.slice(0, 160)}{selected.description.length > 160 ? '…' : ''}</p>}
              <div className="mp-actions">
                {(selected.stable_link || selected.source_url) && (
                  <a href={(selected.stable_link || selected.source_url)!} target="_blank" rel="noreferrer">Open source ↗</a>
                )}
                <Link to={`/dataset/${selected.slug}`}>Full details →</Link>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {!embedded && (
        <div className="map-controls">
          <div className="mc-group">
            <h4>Base layer</h4>
            {Object.entries(BASEMAPS).map(([k, v]) => (
              <label key={k} className="mc-radio">
                <input type="radio" name="basemap" checked={basemap === k} onChange={() => setBasemap(k)} />
                {v.label}
              </label>
            ))}
          </div>
          <div className="mc-group">
            <h4>Data layer</h4>
            <label className="mc-radio">
              <input type="checkbox" checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)} />
              Datasets ({points.length})
            </label>
          </div>
          <div className="mc-group">
            <h4>Point size <span>{pointSize}px</span></h4>
            <input type="range" min={2} max={16} value={pointSize} onChange={(e) => setPointSize(+e.target.value)} />
            <h4>Outline width <span>{outline.toFixed(1)}px</span></h4>
            <input type="range" min={0} max={5} step={0.2} value={outline} onChange={(e) => setOutline(+e.target.value)} />
          </div>
        </div>
      )}
    </div>
  )
}
