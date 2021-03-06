import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {clearErrors} from "../actions/errorActions"
import {loginAction} from "../actions/authActions"
import {authAction} from "../actions/authActions"
import Mapbox from './Mapbox'
import { Button, Input } from 'reactstrap';

// import Cookies from 'js-cookie';


const Landing = (props) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(mail, password)
    }
    useEffect(() => {
        props.authAction();
    }, [])


    useEffect(() => {
        setError(props.error.msg)
    }, [props.error.msg])
    return (
        <>
        {sessionStorage.isAuth ? <Mapbox/>
        :   
        
        <div class="container col-lg-4 border p-4">
                <h1>Connectez-vous pour accéder à la carte</h1>
                {error !== "Token is needed" ? <h3>{error}</h3> : null}
                <form action="post" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="mail">Mail</label>
                    <Input type="mail" name="mail" id="mail" onChange={(e) => setMail(e.target.value)}/>    
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" color="success" className="btn-sm">Submit</Button>
                </form>
            </div> }
        </>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuth,
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { clearErrors, loginAction, authAction })(Landing)
