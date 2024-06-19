import React,{ useEffect, useMemo, useCallback, useState } from 'react';
import Cards from './Block/Cards';
import InputData from './Block/InputData';
import axios from 'axios';


const IncompleteTask = () => {
  const [Data, setData] = useState([]);
  const [InputDiv, setInputDiv] = useState("hidden");
  const [UpdateData, setUpdateData] = useState({ id: "", title: "", description: "" });
  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }), []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/get-incomplete-task", { headers });
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

  console.log(Data);

  return (
    <div>
      <h1 className='text-lg font-bold'>Incomplete Tasks</h1>
      <Cards home={"false"} setInputDiv={setInputDiv} Data={Data} handleDataUpdate={handleDataUpdate} setUpdateData={setUpdateData}/>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdateData={UpdateData} setUpdateData={setUpdateData} handleDataUpdate={handleDataUpdate} />
    </div>
  )
};

export default IncompleteTask;
