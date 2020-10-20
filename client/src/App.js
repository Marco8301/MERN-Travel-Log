import React from 'react';

import { Provider } from 'react-redux';

import store from './store';

import Landing from './components/Landing';

const App = () => {
  // const [viewport, setViewport] = useState({
  //   width: '100vw',
  //   height: '100vh',
  //   latitude: 46.85837,
  //   longitude: 2.294481,
  //   zoom: 5,
  // });

  return (
    <>
      <Provider store={store}>
        <Landing />
        {/* <Modal />
        <ReactMapGL
          {...viewport}
          mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Cities />
        </ReactMapGL> */}
      </Provider>
    </>
  );
};

export default App;
