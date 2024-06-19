import React, { useState, useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';

const InputData = ({ InputDiv, setInputDiv, UpdateData, setUpdateData, handleDataUpdate }) => {
  const [Data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    setData({ title: UpdateData.title, description: UpdateData.description });
  }, [UpdateData]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const submitData = async () => {
    try {
      if (Data.title === "" || Data.description === "") {
        alert("All fields are required");
      } else {
        await axios.post("http://localhost:5000/api/task/create-task", Data, { headers });
        handleDataUpdate(); // Re-fetch the task list
        setInputDiv("hidden");
        setData({ title: "", description: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateTask = async () => {
    try {
      if (Data.title === "" || Data.description === "") {
        alert("All fields are required");
      } else {
        await axios.put(`http://localhost:5000/api/task/update-task/${UpdateData.id}`, Data, { headers });
        handleDataUpdate(); // Re-fetch the task list
        setInputDiv("hidden");
        setUpdateData({ id: "", title: "", description: "" });
        setData({ title: "", description: "" });
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-slate-700 opacity-80 h-screen w-full`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
          <div className='flex justify-end py-2'>
            <button className='text-xl' onClick={() => { setInputDiv("hidden"); setData({ title: "", description: "" }); setUpdateData({ id: "", title: "", description: "" }) }}><RxCross1 /></button>
          </div>
          <input type="text" placeholder='title' name="title" className='px-4 py-2 rounded w-full bg-gray-600' value={Data.title} onChange={change} />
          <textarea placeholder='description' name="description" cols="30" rows="10" className="px-4 py-2 rounded w-full bg-gray-600 my-3" value={Data.description} onChange={change}></textarea>
          {UpdateData.id === "" ? (
            <button className='px-3 py-2 rounded w-full bg-blue-400 text-black text-lg font-semibold' onClick={submitData}>Add</button>
          ) : (
            <button className='px-3 py-2 rounded w-full bg-blue-400 text-black text-lg font-semibold' onClick={UpdateTask}>Update</button>
          )}
        </div>
      </div>
    </>
  );
}

export default InputData;
