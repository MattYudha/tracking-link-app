import React, { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Atur ikon default untuk Marker
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pastikan latitude dan longitude valid
    if (latitude === 0 && longitude === 0) return;

    // Jika container sudah ada dan peta belum diinisialisasi, buat peta baru
    if (containerRef.current && !mapRef.current) {
      const center: LatLngExpression = [latitude, longitude];
      mapRef.current = L.map(containerRef.current, {
        center: center,
        zoom: 13,
      });

      // Tambahkan TileLayer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Tambahkan Marker
      L.marker(center)
        .addTo(mapRef.current)
        .bindPopup("Lokasi Pengguna")
        .openPopup();
    }

    // Cleanup saat komponen di-unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  if (latitude === 0 && longitude === 0) {
    return <div>Data lokasi tidak tersedia</div>;
  }

  return <div ref={containerRef} style={{ height: "400px", width: "100%" }} />;
};

export default Map;
