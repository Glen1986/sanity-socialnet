import React, {useState} from "react"
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom"
// eslint-disable-next-line
import { IoMdAdd, IoMdSearch } from "react-icons/io"

const NavBar = ({ searchterm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if(!user) return null
  return(
    <div className="header ml--2 flex gap-2 md:gap-5 w-full  p-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm ">
        <IoMdSearch fontSize={21} className="ml-1"/>
        <input 
          type="text"
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchterm}
          onFocus={()=>navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3 ">
        <Link
          to={`user-profile/${user?._id}`} 
          className="border-md "
        >
          <img src={user.image} alt="user" className="rounded-md"/>
        </Link>
        <Link to="/create-pin" className="bg-black text-white rounded-lg  w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
          </div>
    )
}

export default NavBar
