import React, {useState} from "react";
import cartas from './../../assets/images/cartas.jpeg';
// import Image from 'next/image'

const Shop = ({user}) => {
  console.log(user.access);

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
    <div className="flex flex-col items-center">
      <div className="flex p-15">
        <h1 className="text-bold">Acessibilidade Fora da Caixinha!!!</h1>
         
      </div>
     <img 
        src={cartas}
       // alt='image'
       // width={40}
       // height={40}
      />
      <div className="flex">
        <input type="checkbox" onChange={()=>{console.log('checked')}}/>
      </div>
    </div>
    )
}

export default Shop
