# CSE204Final
* test user login info
Github email: `mywustlcsetestuser@gmail.com`
Github password: `csetuers240bas`

## Welcome to my final project
* The goal of this project was to create a GitHub base social media site that allows users to post thier projects and view other's projects via README writeups.

## Features
* Login using your GitHub account (scopes are set to read profile info only.) This was accomplished using [FirebaseAuth](https://firebase.google.com/docs/auth)
![login](https://raw.githubusercontent.com/cse204testuser/CSE204Final/master/Screen%20Shot%202020-05-03%20at%201.42.34%20PM.png)

* Upon login your public repos (not inluding those created through another organization like this class) will be displayed on the right of the screen along with a post button.
![right side](https://raw.githubusercontent.com/cse204testuser/CSE204Final/master/Screen%20Shot%202020-05-03%20at%201.19.28%20PM.png)

* When the post button is clicked, the contents of your readme file are requested from Github. Once the reponse is received a second request is sent to convert the .md file to html. Finally, profile information, repo information and the html version of the readme are sent to a [firebase cloud firestore databse](https://firebase.google.com/docs/firestore).
![firestore](https://raw.githubusercontent.com/cse204testuser/CSE204Final/master/Screen%20Shot%202020-05-03%20at%201.38.06%20PM.png)

* Upon logging in, a listener is set to listen for changes to the database. When any user adds a new post, it will immediately be displayed for all users in their feed, on the left side of the screen.

* Each post contains the repo name, owner's username, a link to the repo, and the owner's profile picture in the post header. Below the post header is the readme for the repo.  
![post](https://raw.githubusercontent.com/cse204testuser/CSE204Final/master/Screen%20Shot%202020-05-03%20at%201.50.28%20PM.png)

* Logins are persistent

## Notes
* Readme images must be specified using a url (not just the file location in the repo) to be displayed correctly.
* Must have been recently authenticated to post. If a post is not showing up logout, login and try again.
* Sometimes when a readme is just posted it will display the html as text, click refresh and it will display correctly


