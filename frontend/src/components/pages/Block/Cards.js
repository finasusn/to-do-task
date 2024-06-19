import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdAddBox } from "react-icons/md";
import { IoStarOutline, IoStar } from "react-icons/io5";
import axios from 'axios';

const Cards = ({ home, setInputDiv, Data = [], handleDataUpdate, setUpdateData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/task/update-complete-task/${id}`, {}, { headers });
      handleDataUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImportantTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/task/update-important-task/${id}`, {}, { headers });
      handleDataUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = (id, title, description) => {
    setInputDiv("fixed");
    setUpdateData({ id, title, description });
  }

  const deleteTask = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/task/delete-task/${id}`, { headers });
        handleDataUpdate();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {Data.map((item, i) => (
        <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-sm p-4 '>
          <div>
            <h3 className='text-blue-300 text-xt font-semibold my-2'>{item.title}</h3><hr className='bg-white'/>
            <p className='text-gray-300 my-2'>{item.description}</p>
          </div>
          <div className='mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
            <button
              onClick={() => handleCompleteTask(item._id)}
              className={`${item.complete === false ? "bg-red-800" : "bg-green-800"} p-2 rounded m-1 w-full`}
            >
              {item.complete === true ? "Complete" : "Incomplete"}
            </button>
            <div className='text-white p-2 w-full flex justify-around m-1 text-xl font-semibold'>
              <button onClick={() => handleImportantTask(item._id)}>
                {item.important === false ? <IoStarOutline /> : <IoStar className='text-yellow-400' />}
              </button>
              <button onClick={() => updateTask(item._id, item.title, item.description)}><FaEdit /></button>
              <button onClick={() => deleteTask(item._id)}><MdDeleteForever /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button
          className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300'
          onClick={() => setInputDiv("fixed")}
        >
          <MdAddBox className='text-4xl' />
          <h2 className='text-xl items-center flex'>&nbsp;Add Task</h2>
        </button>
      )}
    </div>
  );
}

export default Cards;
