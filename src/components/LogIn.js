import React, {useState} from 'react'
import {onClickHandlerLogin} from '../firebase.js'
import './Log.css'


const LogIn = () => {
    const onClickHandler = async (event) => {
        onClickHandlerLogin();  
    }
    return(
        <div className="login-container">
            
            <h2>Login/Register</h2>
            <input type="button" className="login-input log-btn" id="login-btn" onClick={(event)=> onClickHandler(event)} value="Login with GitHub" />
        </div>
    );

};
export default LogIn;