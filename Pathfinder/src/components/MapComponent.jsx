import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ startPoint, endPoint, path }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && path.length > 0) {
      const map = mapRef.current;
      const latlngs = path.map(node => L.latLng(node.lat, node.lng));
      L.polyline(latlngs, { color: 'blue' }).addTo(map);
      map.fitBounds(L.latLngBounds(latlngs));
    }
  }, [path]);

  useEffect(() => {
    if (mapRef.current && startPoint && endPoint) {
      const map = mapRef.current;
      map.fitBounds(L.latLngBounds([
        [startPoint.lat, startPoint.lng],
        [endPoint.lat, endPoint.lng]
      ]));
    }
  }, [startPoint, endPoint]);

  return (
    <MapContainer
      center={[startPoint.lat, startPoint.lng]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
      whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='© OpenStreetMap contributors'
      />
      {startPoint && (
        <Marker position={[startPoint.lat, startPoint.lng]}>
          <Popup>Start Point</Popup>
        </Marker>
      )}
      {endPoint && (
        <Marker position={[endPoint.lat, endPoint.lng]}>
          <Popup>End Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
