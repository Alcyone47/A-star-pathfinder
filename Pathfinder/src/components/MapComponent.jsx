// src/components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ startPoint, endPoint, path }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && path.length > 0) {
      const map = mapRef.current.leafletElement;
      const latlngs = path.map(node => L.latLng(node.lat, node.lng));
      L.polyline(latlngs, { color: 'blue' }).addTo(map);
      map.fitBounds(L.latLngBounds(latlngs));
    }
  }, [path]);

  return (
    <MapContainer ref={mapRef} center={[startPoint.lat, startPoint.lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={[startPoint.lat, startPoint.lng]}>
        <Popup>Start Point</Popup>
      </Marker>
      <Marker position={[endPoint.lat, endPoint.lng]}>
        <Popup>End Point</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
