import React, {useState} from "react";
import cartas from '../../assets/images/cartas.jpeg';

const Shop = ({user}) => {
  console.log(user.access);

  // const User= user.access
  
  // console.log(User);
  const acces = (e) => {
    e.preventDefault()
    const myUser = user.acces
    user.access = true
      .commit
    console.log(myUser);
  }
  return(
    <div className="flex flex-col items-center">
      <div className="flex p-15">
        <h1 className="text-bold">Acessibilidade Fora da Caixinha!!!</h1>
         
      </div>
     <img 
        className="w-100 h-60"
        src={cartas}
      />
      <div className="flex">
        <input type="checkbox" onChange={acces}/>
      </div>
    </div>
    )
}

export default Shop
