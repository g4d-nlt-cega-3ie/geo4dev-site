import GeoMap from '../map/GeoMap'
import { geoData } from '../lib/catalog'

export default function MapPage() {
  return (
    <main className="map-wrap">
      <GeoMap points={geoData} height="100%" />
    </main>
  )
}
