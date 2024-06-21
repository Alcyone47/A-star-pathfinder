// src/components/MapContainer.js
import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { aStar } from '../utils/astar';
import { createGrid } from '../utils/grid';

const MapContainer = () => {
  const startPoint = { lat: 51.5, lng: -0.09 };
  const endPoint = { lat: 51.51, lng: -0.1 };

  const [path, setPath] = useState([]);

  const calculatePath = () => {
    const grid = createGrid(10, 10); // Adjust grid size as needed
    const calculatedPath = aStar(startPoint, endPoint, grid);
    setPath(calculatedPath);
  };

  return (
    <div>
      <button onClick={calculatePath}>Calculate Path</button>
      <MapComponent startPoint={startPoint} endPoint={endPoint} path={path} />
    </div>
  );
};

export default MapContainer;
