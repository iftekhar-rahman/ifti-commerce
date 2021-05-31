import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// initializeLoginFramework
export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
  }
}

// google sign in
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const handleGoogleSignIn = () => {
  // console.log("Clicked");
  return firebase.auth()
  .signInWithPopup(googleProvider)
  .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
      // console.log(displayName, email, photoURL);
  })
  .catch((err) => {
      console.log(err)
      console.log(err.message)
  })
}


// FB sign in
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    user.success = true;
    return user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

// handleSignOut
export const handleSignOut = () => {
  return firebase.auth().signOut()
  .then(res => {
    const signOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: '',
      error: '',
      success: false
    }
    return signOutUser;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

// createUserWithEmailAndPassword
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
  })
  .catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
    // console.log(newUserInfo);
  });
}

// signInWithEmailAndPassword
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });  
}

// updateUserName
const updateUserName = name => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name,
  }).then(function() {
    console.log("user name updated successfully");
  }).catch(function(error) {
    console.log(error);
  });
}