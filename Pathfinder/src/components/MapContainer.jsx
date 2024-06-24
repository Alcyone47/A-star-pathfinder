import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { aStar } from '../utils/astar';
import { createGrid } from '../utils/grid';
import { geocode } from '../utils/geocode';

const MapContainer = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 }); // Initial coordinates
  const [endPoint, setEndPoint] = useState({ lat: 0, lng: 0 }); // Initial coordinates
  const [path, setPath] = useState([]);

  const calculatePath = async () => {
    try {
      console.log('Calculating path...');
      console.log('Start Location:', startLocation);
      console.log('End Location:', endLocation);

      // Geocode start and end locations
      const startCoords = await geocode(startLocation);
      console.log('Start coordinates:', startCoords);

      const endCoords = await geocode(endLocation);
      console.log('End coordinates:', endCoords);

      setStartPoint(startCoords);
      setEndPoint(endCoords);

      // Create a grid for pathfinding (dummy implementation)
      const grid = createGrid(10, 10); // Example grid creation
      console.log('Grid:', grid);

      // Calculate the path using A* algorithm
      const calculatedPath = aStar(startPoint, endPoint, grid); // Ensure startPoint and endPoint are defined correctly
      console.log('Calculated path:', calculatedPath);

      setPath(calculatedPath);
    } catch (error) {
      console.error('Error calculating path:', error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Start Location:
          <input
            type="text"
            value={startLocation}
            onChange={e => setStartLocation(e.target.value)}
          />
        </label>
        <label>
          End Location:
          <input
            type="text"
            value={endLocation}
            onChange={e => setEndLocation(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculatePath}>Calculate Path</button>
      <MapComponent startPoint={startPoint} endPoint={endPoint} path={path} />
    </div>
  );
};

export default MapContainer;
