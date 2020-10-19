import React, {useState} from 'react'
import axios from "axios";
// import Cookies from 'js-cookie';


const Landing = (props) => {
    // const jwt = Cookies.get('jwt')
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    // console.log(jwt);

    const authLogin = async () => {
        const body = {mail: mail, 
            password: password
        };
        const config = {
            headers:{
                "Content-type": "application/json",
            }
        }
        const loginRequest = await axios.post("api/auth/login", body, config)
        return loginRequest
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authLogin();
        props.history.push("/map")
    }
    return (
        <div>
            <h1>Landing page</h1>
            <form action="post" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="mail">Mail</label>
                <input type="mail" name="mail" id="mail" onChange={(e) => setMail(e.target.value)}/>    
                <label htmlFor="password">Username</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/> 
                <input type="submit" value="Submit"/>          
            </form>
        </div>
    )
}

export default Landing
