import DeckGL from '@deck.gl/react'
import { ScatterplotLayer } from '@deck.gl/layers'
import { Map } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Dataset } from '../lib/types'

type GeoDataset = Dataset & { lat: number; lng: number }

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
const INITIAL_VIEW = { longitude: 20, latitude: 15, zoom: 1.4, pitch: 0, bearing: 0 }

interface Props {
  data: GeoDataset[]
  onSelect: (d: GeoDataset) => void
  selectedId?: string
}

export default function DeckMap({ data, onSelect, selectedId }: Props) {
  const layer = new ScatterplotLayer<GeoDataset>({
    id: 'datasets',
    data,
    pickable: true,
    stroked: true,
    filled: true,
    radiusUnits: 'pixels',
    getPosition: (d) => [d.lng, d.lat],
    getRadius: (d) => (d.id === selectedId ? 9 : 6),
    getFillColor: (d) => (d.id === selectedId ? [217, 138, 43, 235] : [15, 61, 62, 200]),
    getLineColor: [255, 255, 255, 255],
    lineWidthMinPixels: 1.2,
    onClick: (info) => {
      if (info.object) onSelect(info.object as GeoDataset)
    },
    updateTriggers: { getRadius: selectedId, getFillColor: selectedId },
  })

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW}
      controller
      layers={[layer]}
      getTooltip={({ object }) =>
        object ? { text: (object as GeoDataset).title } : null
      }
    >
      <Map reuseMaps mapStyle={MAP_STYLE} />
    </DeckGL>
  )
}
