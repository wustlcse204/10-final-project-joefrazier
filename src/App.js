import React, { Component } from 'react';
import './App.css';
import { auth } from "./firebase"
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import LargeHeader from './components/LargeHeader';
import RepoItem from './components/RepoItem'
import {onClickHandlerLogin, onClickHandlerLogout} from './firebase.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      userName: "",
      uid: "",
      userEmail: "",
      accessToken: "",
      repos: [],
      userGHLogin: "",
      userGHPic: "",
      userGH: "",
      userGHBio: "",
      userGHReposUrl: ""

    };
  }

  loadUserReposCallback = (response) => {
    console.log("CALLBACK " + JSON.stringify(response));
    this.setState({repos: response});
  }
  loadUserRepos = (endpoint) => {
    var callback = this.loadUserReposCallback;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4){
            callback(JSON.parse(this.responseText));
        }
        else{
            console.log("Error");
        }
    }
    xhttp.open("GET", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }

  setUserState = (response) => {
    this.setState({userGHLogin: response.login, userGHPic: response.avatar_url, userGH: response.url, userGHBio: response.bio, userGHReposUrl: response.repos_url});
    this.loadUserRepos(response.repos_url);
  }

  onClickHandler = async () => {
    var token = await onClickHandlerLogin();
    this.setState({accessToken: token});
    this.requestUsername(token);
  }
  onClickHandlerOut = async () => {
    this.setState({isLoggedIn: false});
    onClickHandlerLogout();
  }

  requestUsername = (token) => {
    var func = this.setUserState;
    var endpoint = "https://api.github.com/user";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4){
            func(JSON.parse(this.responseText));
        }
        else{
            console.log("Error");
        }
    }
    xhttp.open("GET", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "token "+token);
    xhttp.send();
  };
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <LargeHeader/>
          <LogIn onClick={this.onClickHandler} />
        </div>
      );
    }
    else {
      return (
        <div className="App">
        <LargeHeader/>
          <div> User Logged in</div>
          <LogOut onClick={this.onClickHandlerOut}/>

          <div className="user-repos">
            {this.state.repos.map((repo) =>
              <RepoItem key={repo.id} name ={repo.name}  />
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
      // console.log("USER: " + JSON.stringify(userAuth))
      // console.log("UID: "+userAuth.uid);
      // console.log("Name: " + userAuth.displayName);
      // console.log("UserPic: "+userAuth.photoURL);
      // console.log("UserEmail: "+userAuth.email);
      // console.log("API key: "+(JSON.stringify(user.stsTokenManager.apiKey)));
        this.setState({ isLoggedIn: true, userName: userAuth.displayName, uid: userAuth.uid, userEmail:userAuth.email});
        // requestRepos()
        
      }
      else {
        this.state = {
          isLoggedIn: false,
          username: "",
          userName: "",
          uid: "",
          userEmail: "",
          accessToken: "",
          repos: [],
          userGHLogin: "",
          userGHPic: "",
          userGH: "",
          userGHBio: "",
          userGHReposUrl: ""
    
        };
      }

    });
  }

}
export default App;
