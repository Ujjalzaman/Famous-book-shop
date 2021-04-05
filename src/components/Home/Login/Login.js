import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, initalizefirebase } from './LoginManager';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../../App';

// dbName = amazon
// dbcollection = products

function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }


    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }



    return (
        <div  class="wrapper">
            
            <br />
            {/* <button onClick={fbSignIn}>Sign in using Facebook</button> */}
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}!</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }


            <form onSubmit={handleSubmit} class="form-signin">
            <h1 class="form-signin-heading">Login Or SignUp</h1>
                {newUser && <input name="name" type="text" class="form-control" onBlur={handleBlur} placeholder="Your name" />}
                <br />
                <input type="text" class="form-control" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                <br />
                <input type="password" class="form-control" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="submit" class="btn btn-lg btn-primary btn-block" value={newUser ? 'Sign up' : 'Sign in'} />

                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign up</label>
                {/* { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :? */}
                <button class="btn btn-lg btn-danger btn-block" onClick={googleSignIn}>Sign In Using Google</button>
                {/* } */}
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
}

export default Login;