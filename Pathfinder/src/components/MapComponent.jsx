import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ startPoint, endPoint }) => {
  const mapRef = useRef();
  const [path, setPath] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?overview=full&steps=true&geometries=geojson&alternatives=false`
        );
        if (!response.ok) {
          throw new Error('No route found');
        }
        const data = await response.json();
        const route = data.routes[0];

        // Extract coordinates from the route geometry
        const coordinates = route.geometry.coordinates.map(coord => ({
          lat: coord[1],
          lng: coord[0]
        }));

        setPath(coordinates);
        setError(null);
      } catch (error) {
        console.error('Error fetching route:', error);
        setError(error.message);
      }
    };

    if (startPoint && endPoint) {
      fetchRoute();
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (mapRef.current && path.length > 0) {
      const map = mapRef.current;
      map.fitBounds(L.geoJSON(path).getBounds());
    }
  }, [path]);

  const handleClearRoute = () => {
    setPath([]); // Clear the path by setting an empty array
  };

  return (
    <div>
      <MapContainer
        center={[startPoint ? startPoint.lat : 0, startPoint ? startPoint.lng : 0]}
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
        {path.length > 0 && (
          <Polyline positions={path} color="blue" />
        )}
      </MapContainer>
      {error && (
        <div className="error-popup">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
