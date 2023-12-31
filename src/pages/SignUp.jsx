
import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Oauth from '../components/Oauth';

const SignUp = () => {
  const [formData , setFormData]=useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
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
      setLoading(true);
      // const res= await fetch("/api/auth/signup",formData)
      const res= await fetch("/api/auth/signup",{   //vite.config.js
        method:"POST",
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(formData) //When sending data to a web server, the data has to be a string.
       
      })

      const data = await res.json();
      
      if(data.success==false){
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false) //loading is compleated
      setError(null);
      navigate("/signin")
      console.log(data);

    }
    catch(error){
      setLoading(false);
      setError(error.message);
      console.log(error.message)
    }
  }
  return (
  
   <div className='p-3 max-w-lg mx-auto'>
   <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
   <input type='text'
    placeholder='username' 
    className="border p-3 rounded-lg"
    id='username'
    onChange={handlechange}
    required
   />
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
  
   {loading? 'Loading...':'Sign Up'}</button>
   <Oauth/>
   </form>
   <div className="flex gap-2 mt-5">
   <p>Have an account ?</p>
   <Link to="/signin"><span className="text-blue-700">Sign in</span></Link>
   </div>
   {error && <p className='text-red-500 mt-5'>{error}</p>}
 </div>
   
  )
}

export default SignUp;
