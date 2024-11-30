import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ tollPoints }) => {
  return (
    <MapContainer center={[17.385044, 78.486671]} zoom={7} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render markers for toll points */}
      {tollPoints && tollPoints.length > 0 && tollPoints.map((point, index) => {
        // Ensure lat and lng exist before rendering marker
        if (point.lat && point.lng) {
          return (
            <Marker key={index} position={[point.lat, point.lng]}>
              <Popup>
                <strong>{point.name}</strong><br />
                Road: {point.road}<br />
                Cash Cost: ₹{point.cashCost || "Not available"}<br />
                Tag Cost: ₹{point.tagCost || "Not available"}
              </Popup>
            </Marker>
          );
        } else {
          console.error(`Toll point ${point.name} is missing lat/lng data.`);
          return null;
        }
      })}
    </MapContainer>
  );
};

export default Map;
