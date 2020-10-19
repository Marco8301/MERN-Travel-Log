import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import Landing from './components/Landing';
import MapBox from './components/Map';

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
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/map' render={(props) => <MapBox {...props} />} />
        </Switch>
        {/* <Modal />
        <ReactMapGL
          {...viewport}
          mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Cities />
        </ReactMapGL> */}
      </Router>
    </>
  );
};

export default App;
