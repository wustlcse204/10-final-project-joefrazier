import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqef48hVI-52yHHE5ZdVIpXtEIQFoie_Y",
  authDomain: "git-social-v1.firebaseapp.com",
  databaseURL: "https://git-social-v1.firebaseio.com",
  projectId: "git-social-v1",
  storageBucket: "git-social-v1.appspot.com",
  messagingSenderId: "979995074373",
  appId: "1:979995074373:web:a47830151a144caccea82c"
};



firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


export async function onClickHandlerLogin () {
  var provider = new firebase.auth.GithubAuthProvider();

  provider.addScope('repo');
  provider.addScope('user');
  var token;

  await firebase.auth().signInWithPopup(provider).then(function (result) {
    token = result.credential.accessToken;
    // console.log(token);
    var user = result.user;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    var email = error.email;

    var credential = error.credential;

    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking
      // the user's accounts here.
    } else {
      console.error(error);
    }
  });
  return token;


}

export function onClickHandlerLogout() {
 
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
