
import React, {useState} from "react"
import {  useNavigate, Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'


import { client, urlFor} from "../../client"
import {fetchUser} from "../../utils/fetchUser"

const Carta = ({pin: { image, audio }}) => {
  const [ postHovered, setPostHovered ] = useState(false)
  const [ savingPost, setSavingPost ] = useState(false)

  


  return(
    <>
    <div className="m-6">
      <div className="relative cursor-zoom-in w-auto rounded-lg overFlow-hidden transition-all duration-500 ease-in-out"
      >
       <img className=" rounded-lg w-80 m-auto" alt="user-post" src={urlFor(image).width(250).url()}/>
     </div>
    </div>
      <audio src={audio}>play</audio>
    </> 
    )
}

export default Carta
