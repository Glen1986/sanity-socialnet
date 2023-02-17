import React, {useState, useEffect} from "react";
import cartas from './../../assets/images/cartas.jpeg';
import { userQuery } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../utils/fetchUser";
// import Image from 'next/image'

const Shop = ({user}) => {
  // const myId = user.googleId
  const navigate = useNavigate()
  // const localUser = localStorage.getItem('user')
  const userInfo = fetchUser();

  // console.log(user);
  // console.log(webUser);
  // console.log(localUser);
  // console.log(userInfo);
  const webUser = userQuery(userInfo?.googleId)

  // console.log(localUser);
  console.log(webUser);

  // const User= user.access
  
  // console.log(User);
  // const acces = () => {
    // e.preventDefault()
    // const myUser = user.acces
    // user.access = true
      // .commit
    // console.log(myUser);
  // }
  return(
    <>
      {
      userInfo ?
          <div className="flex flex-col items-center">
      <div className="flex p-15">
        <h1 className="text-bold">Acessibilidade Fora da Caixinha!!!</h1>
         
      </div>
     <img 
        src={cartas}
      />
      <div className="flex">
        <input type="text" defaultValue={user?.userName} />
      </div>
    </div>
     :
     navigate('/')
      }
    </>  
  )
}

export default Shop
