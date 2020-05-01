import React, {Component} from 'react'
import {onClickHandlerLogin} from '../firebase.js'
import './Log.css'
import { tsConstructorType } from '@babel/types';


class LogIn extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
        <div className="login-container">
            
            <h2>Login/Register</h2>
            <input type="button" className="login-input log-btn" id="login-btn" onClick={this.props.onClick} value="Login with GitHub" />
        </div>
    );
    }

};
export default LogIn;