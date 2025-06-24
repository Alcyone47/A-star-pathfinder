import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { aStar } from '../utils/astar';
import { createGrid } from '../utils/createGrid';
import { geocode } from '../utils/geocode';

const MapContainer = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [endPoint, setEndPoint] = useState({ lat: 0, lng: 0 });
  const [path, setPath] = useState([]);

  const calculatePath = async () => {
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

      const grid = createGrid(1000, 1000); 
      console.log('Grid:', grid);

      const calculatedPath = aStar(startPoint, endPoint, grid);
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
