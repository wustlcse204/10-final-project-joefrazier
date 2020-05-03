import React, {Component} from 'react'
import './Log.css'


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