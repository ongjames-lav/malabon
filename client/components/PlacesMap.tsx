"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Business } from "@/lib/data";

// Fix Leaflet's default icon issue
const defaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.setIcon(defaultIcon);

interface PlacesMapProps {
  businesses: Business[];
  onBusinessClick?: (id: string) => void;
}

export function PlacesMap({ businesses }: PlacesMapProps) {
  // Default center: Malabon, Philippines
  const defaultCenter: LatLngExpression = [14.6414, 121.0505];

  // Get bounds for all markers
  const getBounds = () => {
    if (businesses.length === 0) return null;
    
    const lats = businesses.map(b => b.location.coordinates[1]);
    const lngs = businesses.map(b => b.location.coordinates[0]);
    
    return {
      center: [
        (Math.min(...lats) + Math.max(...lats)) / 2,
        (Math.min(...lngs) + Math.max(...lngs)) / 2
      ] as LatLngExpression,
      zoom: 13
    };
  };

  const boundsInfo = getBounds() || { center: defaultCenter, zoom: 13 };

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/10">
      <MapContainer
        center={boundsInfo.center}
        zoom={boundsInfo.zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={[business.location.coordinates[1], business.location.coordinates[0]]}
          >
            <Popup>
              <div className="min-w-48">
                <h3 className="font-bold text-sm mb-1">{business.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{business.address}</p>
                <Link
                  href={`/places/${business.id}`}
                  className="text-xs bg-orange-500 text-white px-2 py-1 rounded inline-block hover:bg-orange-600"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
