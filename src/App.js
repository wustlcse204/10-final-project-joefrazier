import React, { Component } from 'react';
import './App.css';
import { auth } from "./firebase"
import SignIn from './components/LogIn';
import SignOut from './components/LogOut';
import LargeHeader from './components/LargeHeader';
import RepoItem from './components/RepoItem'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
      uid: "",
      userPic: "",
      userEmail: "",
      accessToken: "",
      repos: []
    };
  }

  requestUsername = () => {
    var endpoint = "https://api.github.com/users";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            console.log(this);
        }
        else{
            console.log("Error");
        }
    }
    xhttp.open("GET", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "token "+this.state.accessToken);
    xhttp.send();
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <LargeHeader/>
          <SignIn />
        </div>
      );
    }
    else {
      return (
        <div className="App">
        <LargeHeader/>
          <div> User Logged in</div>
          <SignOut />

          <div className="user-repos">
            {this.state.repos.map((repo) =>
              <RepoItem key={repo.id} />
            )}
          </div>


        </div>
      );

    }

  }
  componentDidMount() {
    auth.onAuthStateChanged(userAuth => {
      

      if (auth.currentUser != null) {
        var user = JSON.parse(JSON.stringify(userAuth));
      console.log("USER: " + JSON.stringify(userAuth))
      console.log("UID: "+userAuth.uid);
      console.log("Name: " + userAuth.displayName);
      console.log("UserPic: "+userAuth.photoURL);
      console.log("UserEmail: "+userAuth.email);
      console.log("AccessToken: "+(JSON.stringify(user.stsTokenManager.accessToken)));
        this.setState({ isLoggedIn: true, userName: userAuth.displayName, uid: userAuth.uid, userPic: userAuth.photoURL, userEmail:userAuth.email, accessToken: JSON.stringify(user.stsTokenManager.accessToken)});
        // requestRepos()
        this.requestUsername();
      }
      else {
        this.setState({ isLoggedIn: false, userName: "", uid: "", userPic: "", userEmail:"", accessToken: ""});
      }

    })
  }

}
export default App;
