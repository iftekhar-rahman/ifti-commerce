
import { useContext } from "react";
import { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./loginManager";

function Login() {

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const [newUser, setNewUser] = useState(false);

  // set user
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
  });


  // googleSignIn
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true);
    })
  }

  // fbSignIn
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  // signOut
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  // handleResponse to minimize repeated code
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  
  // Our own authentication
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber; 
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  // handleSubmit
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
      }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  return (
    <div className="login-area pt-5 pb-">
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {
                        user.isSignedIn ? <button onClick={() => signOut()}>Sign Out</button> :
                        <button onClick={() => googleSignIn()}>Sign In using Google</button>
                    }
                    <br />
                    <button onClick={fbSignIn}>Sign in using Facebook</button>
                    
                    {
                        user.isSignedIn && 
                        <div>
                        <p>Welcome {user.name}</p>
                        <p>Your email: {user.email}</p>
                        <img src={user.photo} alt="" />
                        </div>
                    }

                    

                    <h1>Our own Authentication</h1>

                    <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
                    <label htmlFor="newUser">New user sign up</label>

                    <form onSubmit={handleSubmit}>
                        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name"/>}
                    
                        <br />
                        <input onBlur={handleBlur} type="email" name="email" id="" placeholder="Your Email" required/>
                        <br />
                        <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required/>
                        <br />
                        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                    </form>
                    <p style={{color: 'red'}}>{user.error}</p>
                    {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
