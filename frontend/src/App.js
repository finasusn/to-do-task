import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './components/store/auth';

import Home from './components/pages/Home';
import Alltask from './components/pages/Alltask';
import ImportantTask from './components/pages/ImportantTask';
import CompletedTask from './components/pages/CompletedTask';
import IncompleteTask from './components/pages/IncompleteTask';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }else if ( isLoggedIn === false){
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Alltask />} />
          <Route path="important-tasks" element={<ImportantTask />} />
          <Route path="completed-tasks" element={<CompletedTask />} />
          <Route path="incomplete-tasks" element={<IncompleteTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
