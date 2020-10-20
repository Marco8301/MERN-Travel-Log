import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {clearErrors} from "../actions/errorActions"
import {loginAction} from "../actions/authActions"
import {authAction} from "../actions/authActions"
import Mapbox from './Mapbox'
// import Cookies from 'js-cookie';


const Landing = (props) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(mail, password)
    }
    console.log(props.error.msg)
    useEffect(() => {
        props.authAction();
    }, [])

    useEffect(() => {
        setError(props.error.msg)
    }, [props.error.msg])
    return (
        <>
        {props.isAuthenticated ? <Mapbox/>
        :   <div>
                <h1>Connectez-vous pour accéder à la carte</h1>
                {error !== "Token is needed" ? <h3>{error}</h3> : null}
                <form action="post" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="mail">Mail</label>
                    <input type="mail" name="mail" id="mail" onChange={(e) => setMail(e.target.value)}/>    
                    <label htmlFor="password">Username</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/> 
                    <input type="submit" value="Submit"/>          
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
