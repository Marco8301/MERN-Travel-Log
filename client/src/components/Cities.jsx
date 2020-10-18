import React, { PureComponent } from 'react';
import {Marker, Popup} from "react-map-gl"
import axios from "axios"


class Cities extends PureComponent {
    state = {cities: [],
            popUp: []
    }

    componentDidMount() {
        this.getMarkers();
    }

    getMarkers = async () => {
        try {
            const getMarkers = await  axios.get("api/logs");
            const {data} = getMarkers.data
            this.setState({cities: data})
        } catch (error) {
            console.log(error.message)
        }
    }

    setPopUp = (city) => {
        this.setState({popUp: [...this.state.popUp, {id: city._id}]})
    }

    clearPopUp = (id) => {
        const currentPopUp = this.state.popUp
        const next = currentPopUp.filter(p => p.id !== id)
        this.setState({popUp:next})
    }

    deleteMarker = async (id) => {
        try {
            const deleteMarker = await axios.delete(`api/logs/${id}`);
            console.log(deleteMarker);
            this.getMarkers();
        } catch (error) {
            console.log(error)
        }
    }

    render() { 
        const {cities} = this.state
        return ( 

<div>
    {cities.map((city)=> {
        return (
            <>
                <Marker
                    key={city._id}
                    latitude={city.latitude}
                    longitude={city.longitude}
                    offsetLeft={-20}
                    offsetTop={-40}
                    className="marker"
                >
                    <img 
                        src="assets/img/pin.png" 
                        style={{width:"45%", cursor:"pointer"}} 
                        onClick={() => this.setPopUp(city)}
                        alt={city.title}
                    />
                </Marker>
                {this.state.popUp.map((p) => {
                    if(p.id === city._id) {
                        return (
                            <Popup
                                key={"pop"+city._id}
                                latitude={city.latitude}
                                longitude={city.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                anchor='top'
                                dynamicPosition={true}
                                sortByDepth={true}
                                onClose={()=> this.clearPopUp(p.id)}
                            >
                                <div className="popup"
                                onClick={()=> this.clearPopUp(p.id)}
                                >
                                    <h3>{city.title}</h3>
                                    <h5>{city.description}</h5>
                                    <p>{city.comments}</p>
                                    <img src={city.image} alt=""/>
                                </div>
                                <button onClick={() => this.deleteMarker(city._id)}>Supprimer</button>
                            </Popup>
                        )
                    }
                })}
            </>)
        })
    }
</div>
    );
    }
}

export default Cities;



