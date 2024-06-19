import React from 'react';
import Sidebar from "./Block/Sidebar";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-[99vh] gap-1">
      <div className='border border-gray-500 rounded-md w-3/12 p-4 flex flex-col'>
        <Sidebar />
      </div>
      <div className='border border-gray-500 rounded-md w-9/12 p-4 flex flex-col'>
        <Outlet />
      </div>
    </div>
  )
};

export default Home;