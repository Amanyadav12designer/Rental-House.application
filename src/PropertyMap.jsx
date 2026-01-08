import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function PropertyMap({ properties }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={12}
      style={{ height: "300px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map((p) => (
        p.coordinates && (
          <Marker
            key={p.id}
            position={[p.coordinates.lat, p.coordinates.lng]}
          >
            <Popup>
              <strong>{p.title}</strong><br />
              ₹{p.rent}<br />
              {p.location}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}
