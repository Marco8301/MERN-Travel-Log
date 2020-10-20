import React, {useState, useEffect} from 'react'
import Cities from './Cities';
import Modal from './Modal';
import ReactMapGL from 'react-map-gl';
import {authAction} from "../actions/authActions"
import {connect} from "react-redux"



const MapBox = (props) => {
    const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46.85837,
    longitude: 2.294481,
    zoom: 5,
  });

    useEffect(() => {
      props.authAction()
  }, [])

    return (
        <div>
        <Modal />
        <ReactMapGL
          {...viewport}
          mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
        <Cities />
        </ReactMapGL>
        </div>
    )
}

export default connect(null, {authAction})(MapBox)
