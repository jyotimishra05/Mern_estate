
import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'

const Signin = () => {
  const [formData , setFormData]=useState({})
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {error,loading } = useSelector((state)=>state.user)  //this is coming from global state name "user" inside userslice
  const navigate=useNavigate();
  const dispatch=useDispatch();
  // const navigate = useNavigate();
  const handlechange=(e)=>{
    console.log(e.target.value)
    setFormData({
      ...formData ,//indorder to have the track of previous data;
      [e.target.id]:e.target.value
      
    })

  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
      // setLoading(true); doing using dispatch
      dispatch(signInStart())
      // const res= await fetch("/api/auth/Signin",formData)
      const res= await fetch("/api/auth/Signin",{   //vite.config.js
        method:"POST",
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(formData) //When sending data to a web server, the data has to be a string.
       
      })

      const data = await res.json();
      
      if(data.success==false){
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message))
        return;
      }

      // setLoading(false) //loading is compleated
      // setError(null);
      dispatch(signInSuccess(data))
      navigate("/")
      console.log(data);

    }
    catch(error){
      // setLoading(false);
      // setError(error.message);
      // console.log(error.message)
      dispatch(signInFailure(error.message))
    }
  }
  return (
  
   <div className='p-3 max-w-lg mx-auto'>
   <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
   <input type='email'
    placeholder='email' 
    className="border p-3 rounded-lg"
    id='email'
    onChange={handlechange}
    required
   />
   <input type='password'
    placeholder='password' 
    className="border p-3 rounded-lg"
    id='password'
    onChange={handlechange}
    required
   />
   <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
   {loading? 'Loading...':'Sign In'}</button>
   </form>
   <div className="flex gap-2 mt-5">
   <p>Dont have an account ?</p>
   <Link to="/signup"><span className="text-blue-700">Sign up</span></Link>
   </div>
   {error && <p className='text-red-500 mt-5'>{error}</p>}
 </div>
   
  )
}

export default Signin;
