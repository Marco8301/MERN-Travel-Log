import React, { Component } from 'react'
import axios from "axios";

class Modal extends Component {
    state = { 
        api_key: null,
        title:null,
        description:null,
        latitude: null,
        longitude:null,
        visitDate:null,
        err:""
     }

    updateValue =  (e) => {
        this.setState({[e.target.name]:e.target.value});

    }

    clearState = () => {
        this.setState({
        api_key:"",
        title:"",
        description:"",
        latitude: "",
        longitude:"",
        visitDate:"",
        err:""
        })
    }

    submitForm = async (e) => {
        const {title, description, latitude, longitude, visitDate, api_key} = this.state
        try {
            if(!title || !description || !latitude || !longitude || !visitDate || !api_key) {
                e.preventDefault();
                this.setState({err: "Vous devez remplir tous les champs"})
            } else {
                const body = this.state
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": api_key,
                    }
                }
                const newLogEntry = await axios.post("api/logs", body, config)
                console.log(newLogEntry);
                this.clearState();
            }
        } catch (error) {
            console.log(error)
        }

    }


    render() { 
        return ( <div
        style={{width:"20vw",
                position: "absolute",
                top: "5px",
                right: "5px",
                zIndex: 99999,
                backgroundColor:"white",
                padding: "15px"
            }}
            >
            <form onSubmit={this.submitForm}>
                {this.state.err ? <h4 style={{color:"red"}}>{this.state.err}</h4> : <h4>Entrez votre destination</h4>} 
                <div>
                    <label htmlFor="api_key">API Key :</label>
                    <input name="api_key" type="password" id="api_key" onChange={(e)=> this.updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="title">Name</label>
                    <input name="title" type="text" id="title" onChange={(e)=> this.updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" id="description" onChange={(e)=> this.updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" type="text" id="latitude" onChange={(e)=> this.updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" type="text" id="longitude" onChange={(e)=> this.updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="visitDate">visitDate</label>
                    <input name="visitDate" type="date" id="visitDate" onChange={(e)=> this.updateValue(e)} />
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div> );
    }
}
 
export default Modal;