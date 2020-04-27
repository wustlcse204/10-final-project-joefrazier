import React, {useState} from 'react'
import {onClickHandlerLogout} from '../firebase.js'

const SignOut = () => {
    const onClickHandler = async (event) => {
        onClickHandlerLogout();  
    }
    return(
        <div className="login-container">
            <input type="button" className="login-input" id="login-btn" onClick={(event)=> onClickHandler(event)} value="Logout" />
        </div>
    );

};
export default SignOut;