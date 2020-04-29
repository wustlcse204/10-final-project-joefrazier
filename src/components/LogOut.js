import React, {useState} from 'react'
import {onClickHandlerLogout} from '../firebase.js'
import './Log.css'

const LogOut = () => {
    const onClickHandler = async (event) => {
        onClickHandlerLogout();  
    }
    return(
        <div className="logout-container">
            <input type="button" className="login-input log-btn" id="login-btn" onClick={(event)=> onClickHandler(event)} value="Logout" />
        </div>
    );

};
export default LogOut;