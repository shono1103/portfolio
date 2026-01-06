import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const KITASHIRAKAWA_COORDS = [35.0287, 135.7893]

const MapTile = () => (
  <div className="map-wrap">
    <div className="info-map">
      京都府京都市左京区
      <br />
      北白川東伊織町 4-1
      <br />
      Japan
      <br />
    </div>
    <MapContainer center={KITASHIRAKAWA_COORDS} zoom={15}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={KITASHIRAKAWA_COORDS}>
        <Popup>北白川東伊織町 4-1 付近です。</Popup>
      </Marker>
    </MapContainer>
  </div>
)

export default MapTile
