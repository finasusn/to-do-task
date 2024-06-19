import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from'react-redux';

const SignUp = () => {
  const [Data, setData] = useState({username: "", email: "", password: ""});
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
      setData({ ...Data, [name]: value });
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/");
      }
    },[isLoggedIn, navigate]);

  const submit = async () => {
    try{
    if (Data.username === "" || Data.email === "" || Data.password === "") {
      alert("All fields are required");
    } else {
        const response = await axios.post("http://localhost:5000/api/user/signup", Data);
        console.log(response);
        setData({ username:"", email:"", password:""})
        alert(response.data.message);
        navigate("/signup");
    }
      } catch (error) {
        alert(error.response.data.message);
      }
    }    
  


  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-3/6 rounded bg-gray-700'>
        <div className='text-2xl font-semibold my-3'>SignUp</div>
        <input 
          type='text' placeholder='Username' name='username' value={Data.username} onChange={change} 
          className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' />
        <input 
          type='email' 
          className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' 
          placeholder='Email' 
          name='email' 
          value={Data.email} 
          onChange={change}
        />
        <input 
          type='password' 
          className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' 
          placeholder='Password' 
          name='password' 
          value={Data.password} 
          onChange={change}
        />
        <button 
          className='bg-blue-400 text-black px-3 py-1 my-3 w-full text-lg rounded-md transition duration-300 ease-in-out transform hover:scale-105' 
          onClick={submit}
        >
          SignUp
        </button>
        <div className='text-red-500 my-3'></div>
        <Link to='/login' className='text-blue-300 text-sm transition hover:text-violet-200 duration-300 ease-in-out transform hover:scale-105'>Already have an account? Click here to Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
