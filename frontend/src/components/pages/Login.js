import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import axios from 'axios';
import { authActions } from "../store/auth.js";

const Login = () => {
  const [Data, setData] = useState({ username:"", email: "", password: ""});
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setData({...Data, [name]: value });
  };
  const submit = async() => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
      const response = await axios.post("http://localhost:5000/api/user/login", 
        Data 
      );
      setData({ username:"",email:"", password:""});
      console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      navigate("/");
    }
    } catch (error) {
      alert(error.response.data.message);
    }

  };
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect (() =>{
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const dispatch = useDispatch();
  
  
  
  return (
    <div>
      <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-3/6 rounded bg-gray-700'>
        <div className='text-2xl font-semibold my-3'>Login</div>
        <input type='text' className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' placeholder='username' name='username' onChange={change} value={Data.username} />
        <input type='email' className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' placeholder='email' name='email' onChange={change} value={Data.email}/>
        <input type='password' className='bg-gray-800 px-3 py-2 my-3 w-full rounded-md transition duration-300 ease-in-out transform hover:scale-105' placeholder='password' name='password' onChange={change} value={Data.password}/>
        <button className='bg-blue-500 text-black px-3 py-1 my-3 w-full text-lg rounded-md transition duration-300 ease-in-out transform hover:bg-blue-400 hover:text-black hover:scale-105' onClick={submit}>Login</button>
        <Link to='/signup' className='text-blue-300 text-sm transition duration-300 ease-in-out transform hover:text-violet-200 hover:underline hover:scale-105'>Don't have an account yet? Click here to Sign up</Link>
        </div>
    </div>
    </div>
  )
}

export default Login;
