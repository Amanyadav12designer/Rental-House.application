import { MapContainer, TileLayer } from "react-leaflet";

export default function testmap() {
  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        border: "2px solid red"
      }}
    >
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
