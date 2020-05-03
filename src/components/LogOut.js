import React, {Component} from 'react'
import './Log.css'

class LogOut extends Component {
    constructor(props){
        super(props);
    }
    render(){
    return(
        <div className="logout-container">
            <input type="button" className="login-input log-btn" id="login-btn" onClick={this.props.onClick} value="Logout" />
        </div>
    );
    }

};
export default LogOut;