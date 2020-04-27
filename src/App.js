import React, { Component } from 'react';
import './App.css';
import { auth } from "./firebase"
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <SignIn />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <div> User Logged in</div>
          <SignOut />
        </div>
      );

    }

  }
  componentDidMount() {
    auth.onAuthStateChanged(userAuth => {
      alert(JSON.stringify(userAuth));
      if (auth.currentUser != null) {
        this.setState({ isLoggedIn: true });
      }
      else {
        this.setState({ isLoggedIn: false });
      }

    })
  }

}
export default App;
