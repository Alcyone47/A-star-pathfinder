import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { aStar } from '../utils/astar';
import { geocode } from '../utils/geocode';
import { createGrid } from '../utils/createGrid';

const PathfindingVisualizer = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [path, setPath] = useState([]);

  const handleCalculatePath = async () => {
    try {
      console.log('Calculating path...');
      console.log('Start Location:', startLocation);
      console.log('End Location:', endLocation);

      const startCoords = await geocode(startLocation);
      console.log('Start coordinates:', startCoords);

      const endCoords = await geocode(endLocation);
      console.log('End coordinates:', endCoords);

      setStartPoint(startCoords);
      setEndPoint(endCoords);

      const gridWidth = 1000;
      const gridHeight = 1000;
      const grid = createGrid(gridWidth, gridHeight);
      console.log('Grid:', grid);

      // Calculate scale factors to normalize coordinates
      const latMin = Math.min(startCoords.lat, endCoords.lat);
      const latMax = Math.max(startCoords.lat, endCoords.lat);
      const lngMin = Math.min(startCoords.lng, endCoords.lng);
      const lngMax = Math.max(startCoords.lng, endCoords.lng);

      const scaleLat = (lat) => Math.floor((lat - latMin) / (latMax - latMin) * (gridHeight - 1));
      const scaleLng = (lng) => Math.floor((lng - lngMin) / (lngMax - lngMin) * (gridWidth - 1));

      const startNode = { x: scaleLng(startCoords.lng), y: scaleLat(startCoords.lat) };
      const endNode = { x: scaleLng(endCoords.lng), y: scaleLat(endCoords.lat) };

      console.log('Start node:', startNode);
      console.log('End node:', endNode);

      const calculatedPath = aStar(startNode, endNode, grid);
      console.log('Calculated path:', calculatedPath);

      setPath(calculatedPath.map(node => ({
        lat: latMin + (node.y / (gridHeight - 1)) * (latMax - latMin),
        lng: lngMin + (node.x / (gridWidth - 1)) * (lngMax - lngMin)
      })));
    } catch (error) {
      console.error('Error calculating path:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
        placeholder="Start Location"
      />
      <input
        type="text"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
        placeholder="End Location"
      />
      <button onClick={handleCalculatePath}>Calculate Path</button>
      <MapComponent startPoint={startPoint} endPoint={endPoint} path={path} />
    </div>
  );
};

export default PathfindingVisualizer;
