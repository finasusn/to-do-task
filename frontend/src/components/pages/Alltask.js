import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Cards from "./Block/Cards";
import { MdAddBox } from "react-icons/md";
import InputData from './Block/InputData';
import axios from 'axios';

const Alltask = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState([]);
  const [UpdateData, setUpdateData] = useState({ id: "", title: "", description: "" });

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }), []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/get-all-task", { headers });
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [headers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDataUpdate = () => {
    fetchData();
  };

  return (
    <>
      <div>
      <div className='flex items-center justify-between'>
  <span className='text-lg font-bold'>All Tasks</span>
  <span className='flex items-center'>
    <button onClick={() => setInputDiv("fixed")} className='focus:outline-none'>
      <MdAddBox className='text-3xl text-gray-500 hover:text-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105' />
    </button>
  </span>
</div>

        {Data && <Cards home="true" setInputDiv={setInputDiv} Data={Data.tasks} handleDataUpdate={handleDataUpdate} setUpdateData={setUpdateData} />}
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdateData={UpdateData} setUpdateData={setUpdateData} handleDataUpdate={handleDataUpdate} />
    </>
  );
}

export default Alltask;
