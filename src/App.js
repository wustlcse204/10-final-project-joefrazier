import React, { Component } from 'react';
import './App.css';
import { auth } from "./firebase"
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import LargeHeader from './components/LargeHeader';
import RepoItem from './components/RepoItem'
import {onClickHandlerLogin, onClickHandlerLogout} from './firebase.js'
import { firestore } from './firebase';
import Post from './components/Post';
// LOGIN
// cse204testuser
// csetuers240bas

// mywustlcsetestuser@gmail.com
// csetuers240bas
// blah2103

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
      userGHReposUrl: "",
      posts: []

    };
  }

// -------  POST README -----------

  getReadme = (repo) => {
    var repoName = repo.name;
    var ghLogin =  repo.owner.login;
    console.log("login: " +ghLogin);
    console.log("login: " +repoName);
    var token =this.state.accessToken;
    // var endpoint = "https://api.github.com/repos/"+ghLogin+"/"+repoName+"/contents/README.MD";
    var endpoint = "https://api.github.com/repos/"+ghLogin+"/"+repoName+"/readme";
    var xhttp = new XMLHttpRequest();
    var getReadmeCallback = this.getReadmeCallback;
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4){
            getReadmeCallback(this, repo);
        }
        else{
          console.log(this);
            console.log("Repo does not contain a readme");
        }
    }
    xhttp.open("GET", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/vnd.github.v3.raw");
    xhttp.setRequestHeader("Authorization", "token "+token);
    xhttp.send();
}

getReadmeCallback = (response, repo) => {
    var data = JSON.parse(response.responseText);
    var readme1 = data.content;
    if(readme1 !== undefined){
      var readme = atob(readme1);
      this.readmeToHTML(readme, repo);
    }
    else{
      console.log("Get Readme Callback error");
    }
}

readmeToHTML = (stringReadme, repo) => {
    var endpoint = "https://api.github.com/markdown";
    var body = { "text": stringReadme, "mode": "markdown"}
    var addReadmeToDB = this.addReadmeToDB;
    body = JSON.stringify(body);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4){
            addReadmeToDB(this.responseText, repo);
        }
        else{
            console.log("Readme To Html Error");
        }
    }
    xhttp.open("POST", endpoint, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("Authorization", "token "+this.state.accessToken);
    xhttp.send(body);
}

addReadmeToDB = (readme, repo) =>{
  console.log("Add read me");
  // var temp = document.createElement("div");
  // temp.innerHTML = readme;
  // document.getElementById("post-container").appendChild(temp);
  var db = firestore;
  db.collection("posts").doc(repo.id.toString()).set({
    repoID: repo.id,
    readme: readme,
    ownerUID: this.state.uid.toString(),
    ownerPic: this.state.userGHPic,
    repoName: repo.name,
    owner: repo.owner.login,
    link: repo.html_url,
    clone: repo.clone_url,
    language: repo.language,
    description: repo.description
  }).then(function(){
    console.log("Readme posted successfully");
  });
}

// --------- LOAD REPOS ----------

  loadUserReposCallback = (response) => {
    var db = firestore;
    for(var x = 0; x < response.length; ++x){
      db.collection(this.state.uid.toString()).doc(response[x].id.toString()).set({
        repoID: response[x].id.toString(),
        repoName: response[x].name,
        link: response[x].html_url,
        description: response[x].description,
        clone: response[x].clone_url,
        language: response[x].language,
        owner: response[x].owner.login,
        ownerPic: this.state.userGHPic,
        repo:response[x]
      }, { merge: true }).then(function(){
        console.log("success");
      });
    }
    // this.setState({repos: userRepos});
  }
  loadUserRepos = () => {
    var endpoint = "https://api.github.com/user/repos?visibility=public";
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
    xhttp.setRequestHeader("Authorization", "token "+this.state.accessToken);
    xhttp.send();
  }


// --------  HANDLE LOGIN/LOGOUT  -----------

  onClickHandler = async () => {
    var token = await onClickHandlerLogin();
    this.setState({accessToken: token});
    this.requestUsername(token);
  }
  onClickHandlerOut = async () => {
    this.setState({isLoggedIn: false});
    onClickHandlerLogout();
  }

// ----------  GET USERNAME  ----------------
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

  setUserState = (response) => {
    this.setState({userGHLogin: response.login, userGHPic: response.avatar_url, userGH: response.url, userGHBio: response.bio, userGHReposUrl: response.repos_url});
    this.loadUserRepos();
  }


  postRepo = (repoStr) => {
    var repo = JSON.parse(repoStr);
    this.getReadme(repo);
  }




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
          <LogOut onClick={this.onClickHandlerOut}/>
          <div className="main-container">
          <div id="post-container">
            {this.state.posts.map((post) =>
              <Post key={post.repoID} repoID={post.repoID} name={post.repoName} owner={post.owner} readme={post.readme} ownerPic={post.ownerPic} link={post.link} />
            )}
          </div>
          <div className="user-repos">
            {this.state.repos.map((repo) =>
              <RepoItem key={repo.repoID} name ={repo.repoName} owner={repo.owner} description={repo.description} repo={repo.repo} onClick={this.postRepo} />
            )}
          </div>
          </div>
        </div>
      );

    }

  }


  renderPosts = (postList) => {
    console.log("LISTS: " + JSON.stringify(postList[0]));
    this.setState({posts: postList});
  }

  renderRepoList = (repoList) => {
    this.setState({repos: repoList});
  }

  componentDidMount() {
    //GET CURRENT POSTS
    var db = firestore;
    var postList = [];
    var renderPostsCallback = this.renderPosts;
    var renderUserRepoListCallback = this.renderRepoList;
    var userRepoList = [];
    
    auth.onAuthStateChanged(userAuth => {
      postList = [];
      if (auth.currentUser !== null) {
        var user = JSON.parse(JSON.stringify(userAuth));
        this.setState({ isLoggedIn: true, userName: userAuth.displayName, uid: userAuth.uid, userEmail:userAuth.email});   

        db.collection("posts").onSnapshot(function(snapshot){  
          postList = [];
          snapshot.forEach(function(doc){
            // if (change.type === "added") {
              postList.push(doc.data());
            // }
          });
          console.log("SETTING POST LIST");
          renderPostsCallback(postList);
        }); 
      
        db.collection(userAuth.uid).onSnapshot(function(snapshot){
          userRepoList = [];
          snapshot.docChanges().forEach(function(change){
            // if(change.type === "added"){
              userRepoList.push(change.doc.data());
            // }
          });
          renderUserRepoListCallback(userRepoList);
        })
      }
      else {
        this.setState({
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
    
        });
      }

    });

    
  }

}
export default App;
