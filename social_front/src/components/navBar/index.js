import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoMdAdd, IoMdSearch } from "react-icons/io"
import { AiOutlineShoppingCart } from 'react-icons/ai'

const NavBar = ({ searchterm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  console.log(user);

  if(!user) return null
  return(
    <div className="header  flex gap-2  w-full  p-7 ">
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
       {user && (
        <Link
          to={`user-profile/${user?.googleId}`}
          className="min-[760px]:w-[80px]  flex items-center bg-transparent "
        >
          <img src={user?.imageUrl} className="hidden md:flex w-18 h-full rounded-full " alt="user-profile" />
        </Link>
      )}
       <div className="flex flex-col">
          <Link to="/create-pin" className="bg-black text-white rounded-lg  w-8 h-8 md:w-14 md:h-12 flex justify-center items-center">
          <IoMdAdd />
        </Link><Link to="/shop" className="bg-black text-white rounded-lg  w-8 h-8 md:w-14 md:h-12 flex justify-center items-center">
          <AiOutlineShoppingCart />
        </Link>
       </div>
      </div>
          </div>
    )
}

export default NavBar
