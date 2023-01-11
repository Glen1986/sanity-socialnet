import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./containers/home";


const App = () => {
  return (
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='login' element={<Login/>}/>     
   </Routes>
  )
}
export default App;
