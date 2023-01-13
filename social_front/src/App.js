import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Home from "./containers/home";


const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);
  return (
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='login' element={<Login/>}/>     
   </Routes>
  )
}
export default App;
