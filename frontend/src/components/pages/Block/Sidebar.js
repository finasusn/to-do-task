import React, { useEffect, useState } from 'react';
import { FaCheckDouble } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { TbNotes } from "react-icons/tb";
import { LuBan } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const data = [
    { title: "All Tasks", icon: <TbNotes />, to: '/' },
    { title: "Important Tasks", icon: <IoIosAlert />, to: '/important-tasks' },
    { title: "Completed Tasks", icon: <FaCheckDouble />, to: '/completed-tasks' },
    { title: "Incomplete Tasks", icon: <LuBan />, to: '/incomplete-tasks' },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ Data , setData ] = useState([]);
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear('id');
    localStorage.clear('token');
    navigate('/login');
  };

  const headers = {
    'id': localStorage.getItem("id"), 
    'Authorization': `Bearer ${ localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/get-all-task",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      { Data && (
      <div className='py-2'>
        <h1 className='text-xl font-semibold'>{Data.username}</h1>
        <h6 className='my-1 text-gray-600'>{Data.email}</h6>
        <hr />
      </div>
      )}
      <div>
        {data.map((item, index) => (
          <Link 
            to={item.to} 
            key={index} 
            className='my-2 flex items-center text-gray-300 hover:bg-gray-600 p-1 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105'
          >
            {item.icon} &nbsp; {item.title}
          </Link>
        ))}
      </div>
      <br />
      <div>
        <button className='bg-gray-600 w-full p-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105' onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;