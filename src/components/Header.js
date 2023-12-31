import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();


  const handleSignOut = () => {

    signOut(auth)
    .then(() => {})
    
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect( ()=> {

   const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName, photoURL} = user
          dispatch(addUser({ 
                      uid: uid, 
                      emai: email,
                      displayName: displayName, 
                      photoURL: photoURL 
                    }));
          //after user sign in, we will take him to browse page
         navigate('/browse')
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate('/')
        }
      });

      return () => unsubscribe();
      // whenever my header components unloads/ ummounts then it will unsubscirbe the onAuthStateChanged api
      
}, [])

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img 
            className="w-44"
            src={LOGO}
            alt="logo" />

            {user && <div className="flex p-2">
              <img 
                className="w-12 h-12 rounded-lg"
                src={user?.photoURL} 
                alt='user-icon'
              />
              <button onClick={handleSignOut} className="font-bold text-white mx-2">Sign Out</button>

            </div>
            }
    </div>
  )
}

export default Header

