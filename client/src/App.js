import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import Cities from './components/Cities';
import Modal from './components/Modal';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46.85837,
    longitude: 2.294481,
    zoom: 5,
  });

  return (
    <>
      <Modal />

      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
        mapboxApiAccessToken='pk.eyJ1IjoibWFyY284MzAxIiwiYSI6ImNrZ2RmcWZuNzA0ZG4zMXF1c296ZnN6OWUifQ.12l0MSTou3Vws7W-q0znrg'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Cities />
      </ReactMapGL>
    </>
  );
};

export default App;
