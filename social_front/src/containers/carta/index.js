
import React, {useState} from "react"


import {  urlFor} from "../../client"

const Carta = ({pin: { image, audio }}) => {
  


  return(
    <>
    <div className="m-6">
      <div className="relative cursor-zoom-in w-auto rounded-lg overFlow-hidden transition-all duration-500 ease-in-out"
      >
       <img className=" rounded-lg w-80 m-auto" alt="user-post" src={urlFor(image).width(250).url()}/>
     </div>
    </div>
      <audio className="" src={audio}>play</audio>
    </> 
    )
}

export default Carta
