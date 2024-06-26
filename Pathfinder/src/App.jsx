import React from 'react';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className='container'>
      <h1 className='header'>A* Pathfinder.</h1>
      <div className='mapContainer'><PathfindingVisualizer /></div>
    </div>
  );
}

export default App;
