import React, {useState} from "react"
import {  useNavigate, Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'


import { client, urlFor} from "../../client"
import {fetchUser} from "../../utils/fetchUser"

const Pin = ({pin: {postedBy, image,  _id,  destination, save}}) => {
  const [ postHovered, setPostHovered ] = useState(false)
  const [ savingPost, setSavingPost ] = useState(false)
  const navigate = useNavigate()
  const user = fetchUser()

  // console.log(postedBy, destination)
  // const alredySaved = !!(save?.save?.filter((item) => item.postedBy._id === user.googleId))?.length
  const alredySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length;

  console.log( postedBy, destination, postHovered, savingPost )
  const savePin = (id) => {
    // if(!alredySaved){
      setSavingPost(true)
      client
        .patch(id)
        .setIfMissing({save:[]})
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.googleId,
          postedBy: {
            _type:'postedBy',
            _ref: user.googleId,
          }
        }])
        .commit()
        .then(() => {
           window.location.reload()
           setSavingPost(false)
       })
    // }
  }
  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
  }


  return(
    <div className="m-2">
      <div
        onMouseEnter={ ()=> setPostHovered(true) }
        onMouseLeave={ ()=> setPostHovered(false) }
        onClick={ ()=> navigate(`/pin-detail/${_id}`) }
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overFlow-hidden transition-all duration-500 ease-in-out"
      >
       <img className="rounded-lg w-full" alt="user-post" src={urlFor(image).width(250).url()}/>
        {  (
        <div class="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{ height: '100%'}}
        >
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 ">
              <a 
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => { e.stopPropagation() }}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
              >
                <MdDownloadForOffline />
              </a>
            </div>
            { alredySaved ? (
            <button 
              type="button"
              onClick={(e) => {
                savePin(_id)
                e.stopPropagation()
                // e.preventDefault()
                // console.log('saved')
              }}
              className="bg-white p-1 rounded-md opacity-30 hover:opacity-100">
              {save?.length} Saved
             </button>
            ):(
            <button
              className="bg-black text-white p-1 rounded-md opacity-30 hover:opacity-100"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                // e.preventDefault()
                savePin(_id)
                // console.log('save')
              }}
            >
              Save
            </button>
            )}
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            { destination && (
            <a href={destination}
              target="blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-2 bg-white rounded-md p-1 opacity-30 hover:opacity-100"
              >
              <BsFillArrowUpRightCircleFill />
              {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
              </a>
            )}
            { postedBy?._id === user.googleId && (
            <button
              className="bg-red-500 text-white p-1.5 rounded-full opacity-50 hover:opacity-100"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                deletePin(_id)
              }}
            >
              <AiTwotoneDelete />
            </button>
            )}
          </div>
        </div>
        )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 items-center m-auto p-1">
        <img className="w-8 h-8 rounded-full object-cover" src={postedBy?.image} alt="user-img" target="blanc" />
        <p className="font.semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
    )
}

export default Pin
