import React, {useState} from "react"
import { BsCloudArrowUp } from 'react-icons/bs'
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import Image from 'next/image';

import { client } from "../../client"
import Spinner from "../spinner"
import { NavLink } from "react-router-dom"
import { categories } from "../../utils/data"


const CreatePin = ({ user }) => {

  const [ title, setTitle ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ destination, setDestination ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ fields, setFields ] = useState(false);
  const [ category, setCategory ] = useState(null);
  const [ imageAsset, setImageAsset ] = useState(null);
  const [ wrongImageType, setWronImageType ] = useState(false);
  const [ comments, setComments ] = useState('');

  const navigate = useNavigate();

  const uploadImage = (e) => {

    const { type, name } = e.target.files[0]

    if( type === 'image/png' || type === 'image/jpeg' ||type === 'image/gif' || type === 'image/svg' ) {

      setWronImageType(false);
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], {contentType: type, filename: name})
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('upload error', error)
        })
    }else{
      setWronImageType(true);
    }
  }


  const savePin = () => {
    if(title && about && destination  && imageAsset?._id && category){
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        comments,
        image: {
          _type:'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      }
      client.create(doc)
        .then(()=>{
          navigate('/')
        })
    }else{
      setFields(true)
      setTimeout(()=> setFields(false), 2000)
    }
  }
  return(
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
      {fields && (
       <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">All Fields</p>
      )}
      <div className="flex flex-col justify-center items-center bg-white lg:pd-5 p-3 lg:w-3/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            { wrongImageType && <p>Wrong Image Type</p> }
            { !imageAsset ? (
            <label>
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <BsCloudArrowUp/>
                  </p>
                  <p className="text-lg">Click to Upload</p>
                   <input 
                     name="Upload-Image"
                     type="file" 
                     className="flex flex-col w-0 f-0" 
                     onChange={uploadImage}
                  />
                </div>
              </div>
            </label>
            ):(
              <div className="relative h-full ">
                <Image src={imageAsset?.url} alt="uploaded-pic" className="w-full h-full"/>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />

                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pd-5 mt-5 w-full">
           {user && (
          <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
            <Image 
              src={user.image}
              className="W-10 H-10 rounded-full"
              alt="user-profile"
            />   
            <p className="font-bold">{user.userName}</p>
          </div>
          )}

         <input 
            className="flex outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2" 
            type="text" 
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            placeholder="add your title"
          />
         <input 
            className="flex outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2" 
            type="text" 
            value={about}
            onChange={(e) => { setAbout(e.target.value) }}
            placeholder="whats About your pin?"
          />
         <input 
            className="flex outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2" 
            type="text" 
            value={destination}
            onChange={(e) => { setDestination(e.target.value) }}
            placeholder="add your destination Url"
          />
         <input 
            className="flex outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2" 
            type="text" 
            value={comments}
            onChange={(e) => { setComments(e.target.value) }}
            placeholder="add your Comments"
          />
       

        <div>
          <h3 className="mb-2 font-semibold text-lg">Pin Category </h3>
          <select 
            onChange={(e) => setCategory(e.target.value)}
            id="categories" value={category} name="category"
            className="outlone-none w-4/5"
          >
            <option>Select Category</option>
            {categories.map((category) => (
              <option 
                value={category.name}
                key={category.name}
              >{category.name}</option>
            ))}
          </select>
          </div>
    <div className="flex justify-end items-end mt-5">
      <button
        type="button"
        onClick={savePin}
        className="bg-red-500 text-white rounded-full p-2"
      >
        Save Pin
      </button>
    </div>
        </div>
      </div>
    </div>
    )
}
// <option>{categories.map((category) => ( <NavLink key={category.name}>{category.name}</NavLink> ))}</option>

export default CreatePin

