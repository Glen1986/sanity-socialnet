import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from 'react-icons/hi';
import { userQuery } from '../../utils/data'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Routes, Route, Link } from 'react-router-dom';

import {  Sidebar, UserProfile  }  from '../../components'
import Pins from "../pins";
import { client } from '../../client'
import logo from '../../assets/logo.png'
import { fetchUser } from "../../utils/fetchUser";


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [ user, setUser ] = useState(null)
  const userInfo = fetchUser();
  const scrollRef = useRef(null);


  useEffect(()=>{
    const query = userQuery(userInfo?.googleId)

    client.fetch(query)
      .then((data)=>{
        setUser(data[0])
      })
     
  },[userInfo?.googleId])
  useEffect(()=>{
    scrollRef.current.scrollTo(0, 0)
  },[])
  console.log(user);
  console.log(userInfo)
  //overflow-y-auto z-10
  //w-full flex
  return(
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="header flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={()=> setToggleSidebar(true)}/>
        <Link>
          <img src={logo} alt="logo" width={160} className="w-28"/>
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" width={80} className="w-28"/>
        </Link>
        </div>
        {toggleSidebar && (
      <div className="fixed w-2/5 bg-white shadow-md h-screen overflow-y-auto z-10 animate-slide-in">
        <div className="absolute w-full flex justify-end items-center p-2">
          <AiFillCloseCircle fontSize={25} className="cursor-pointer z-1" onClick={()=> setToggleSidebar(false)} />
        </div>
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      )}
      </div>
      <div className="body pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path= "/user-profile/:userId" element={<UserProfile />} />
          <Route path= "/*" element={<Pins user={userInfo && userInfo} />} />          
        </Routes>
      </div>
    </div>
    )
}
//
export default Home
