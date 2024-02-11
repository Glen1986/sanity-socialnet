import React, { useEffect } from "react"
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"
import { FcGoogle } from "react-icons/fc"

import shareVideo from "../../assets/is.mp4"
import logo from "../../assets/logowhite.png"

import { client } from "../../client"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;
    useEffect(()=>{
      gapi.load("client:auth2", ()=> {
        gapi.auth2.init({clientId:clientId})
    })
  },[clientId]);

  const responseGoogle = (response) => {
    console.log(response)
    localStorage.setItem('user',JSON.stringify(response.profileObj ))
//
    const { name, googleId, imageUrl, access } = response.profileObj;

    const doc = {
      _id: googleId,
       _type:'user',
      userName: name,
      image: imageUrl,
      access: access,
    }

     client.createIfNotExists(doc)
      .then(() => {
      navigate('/', { replace:true })
  })
}

  return(
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="reltive w-full h-full">
        <video 
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover "
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <image src={logo} alt="logo" width="140px" />
          </div>
            <div className="shadow-2xl">
              <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                bg-1
                render={( renderProps )=>(
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-4 rounded-lg cursor-pointer" 
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" />Seja Benvindo com Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
        </div>
      </div>
    </div>
    )
}

export default Login
