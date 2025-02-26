import React, { useState, useEffect } from "react";
import { cartasMoreQuery, userQuery, searchQuery } from "../../utils/data";
import { client } from "../../client";
import Carta from "../../containers/carta";
import {  Audio, Spinner, Pagination } from '../../components';
import { fetchUser } from "../../utils/fetchUser";
import { useNavigate } from "react-router-dom";


const Galeria = ({user}) => {
  const userInfo = fetchUser();
  const [loading, setLoading] = useState(false);
  const [cartas, setCartas] = useState('');
  const [nCarta, setNCarta] = useState(0);
  const [audio, setAudio] = useState('');
  const [error, setError] = useState("");
  const [sanityUser, setSanityUser] = useState("");
  const access = sanityUser.access
  const navigate = useNavigate()
    // console.log(access);
    useEffect(()=>{
    const query = userQuery(userInfo?.googleId)

    client.fetch(query)
      .then((data)=>{
        setSanityUser(data[0])
      })
     
  },[userInfo?.googleId])
      useEffect(() => {
        setLoading(true)
        const query = cartasMoreQuery(nCarta)

        client.fetch(query)
          .then((data) => {
            setCartas(data)
            const myAudio = data[0].audio.asset.url
            setAudio(myAudio)
            setLoading(false)
            // console.log(myAudio);
          })
          .catch(e =>{
            setError(e)
          })
        
    },[nCarta, error]);
// console.log(sanityUser);
      useEffect(() => {
       if(access == false) return navigate('/shop', { replace:true } )

      },[access, navigate]);

      return(
        
        <div className=" flex flex-col item-center justify-center p-5">
          
          <div className="flex items-center ">
            <h1 className="flex mx-auto mb-6">Galeria</h1>
          </div>
          <div className="max-w-40% border-solid border-2 border-white rounded-xl pb-6 mx-auto flex flex-col">
          {
            cartas ? cartas.map((carta) => <Carta className="p-12 p-12" pin={carta} key={carta} audio={carta.audio} />) : <Spinner message='Loading'/>
          }
          
          <div className="flex flex-col items-center justify-center">
            {
              !user  &&
              navigate('/shop', {replace:true})
            }

          </div>
          </div>
           <div className="flex flex-col mx-auto mt-8">
             <Audio audio={audio}/>
          
           </div>
          <div>
            <Pagination nCarta={nCarta} setNCarta={setNCarta} />
          </div>
        </div>
        )
    }

    export default Galeria
