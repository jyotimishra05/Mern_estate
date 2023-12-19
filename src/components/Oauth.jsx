import React from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth"
import { useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'


import { app } from '../firebase';

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    //we need to wait for google to respond
const handleGoogleClick=async()=>{

    try{
        const provider=  new GoogleAuthProvider();
        const auth = getAuth(app);  //pass app (which gonna tell which application is provide firebase) that inclue all the information of firebase
        const result = await signInWithPopup(auth, provider);
        console.log("result",result);
        const res= await fetch("/api/auth/google",{   //vite.config.js
          method:"POST",
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}) //When sending data to a web server, the data has to be a string.
         
        })
        const data = await res.json();
        console.log("data",data);
        dispatch(signInSuccess(data));
        navigate("/")

    }
    catch(error){
        console.log("could not sign-in with goole" , error)
    }
}    
  return (
   
    <button type="button" onClick={handleGoogleClick} className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
  continue with Google
    </button>
    
  )
}

export default Oauth
