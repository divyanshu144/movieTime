import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { User_Avatar, Bg_Image } from '../utils/constants';

const Login = () => {
    
    const [isSignInForm, setisSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();
    
    // ref for accessing the values of email and password from input tag
    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // validate the form data

       // console.log(email.current.value);
       // console.log(password.current.value);

       const message =  checkValidData(email.current.value, password.current.value)
       setErrorMessage(message);
       // if form is valid then i can proceed for sign in or sign up

       if(message) return; // if there is a message then return that i.e whatever the error message


       if(!isSignInForm){

        //sign up logic
            createUserWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )

                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value , 
                        photoURL:  User_Avatar 
                      })
                      .then(() => {
                        // Profile updated!
                        // so we will update our store once again
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        //here we are getting these uid, email, displayname and photoURL from the updated value of user not the old value
                        dispatch(addUser({ 
                                        uid: uid, 
                                        emai: email,
                                        displayName: displayName, 
                                        photoURL: photoURL 
                            }));
                      })
                      .catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                      });
                    
                 })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    setErrorMessage(errorCode + "-" + errorMessage)
                });

       }
       else {
            // sign in logic

            signInWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )

            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //console.log(user);
            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                setErrorMessage(errorCode + "-" + errorMessage)
            })
        
       }

    }


  return (
    <div>
        <Header/>
        <div className="absolute">
            <img src={Bg_Image}
                alt="logo" />
        </div>
        {/* creating a login form */}
        <form onSubmit={ (e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4 text-white"> 
                {isSignInForm ? "Sign In" : "Sign Up" }
            </h1>
            { !isSignInForm && <input 
                ref={name}
                type="text" 
                placeholder='Full Name'
                className="p-4 my-4 w-full rounded-lg"
            />}
            <input 
                ref={email}
                type="text" 
                placeholder='Email'
                className="p-4 my-4 w-full rounded-lg"
            />
            <input 
                ref={password}
                type="password" 
                placeholder='Password' 
                className="p-4 my-4 w-full rounded-lg"
            />
            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
            <button className="p-4 my-6 w-full rounded-lg bg-red-700" onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up" }
            </button>
            <p 
                className="py-4 cursor-pointer text-white" 
                onClick={toggleSignInForm}
            >
                {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now" }
            </p>
        </form>
    </div>
  )
}

export default Login