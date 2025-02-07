import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './style/global.css';

import Login from "./components/login";
import Home from "./containers/home";
import { fetchUser } from '../src/utils/fetchUser';


const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser();

    if (!user) return navigate('/login');
  }, [navigate]);

  return (
   <Routes>
     <Route path='/login' element={<Login/>}/>     
     <Route path='/*' element={<Home/>}/>
   </Routes>
  )
}
export default App;
