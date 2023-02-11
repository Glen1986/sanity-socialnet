import React, { useState, useEffect } from "react";
import { cartasMoreQuery, userQuery, searchQuery } from "../../utils/data";
import { client } from "../../client";
import Pin from '../pin';
import Carta from "../../containers/carta";
import Spinner from "../spinner";
import Audio from "../audio";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// import "yet-another-react-lightbox/styles.css";
// import { Pin } from '../../components'


const Galeria = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [cartas, setCartas] = useState('');
  const [nCarta, setNCarta] = useState(0);
  const [audio, setAudio] = useState('');
  const [error, setError] = useState("");
  const access = user.access
  const navigate = useNavigate()
console.log(access);
  useEffect(() => {
    setLoading(true)
    const query = cartasMoreQuery(nCarta)

    client.fetch(query)
      .then((data) => {
        setCartas(data)
        const myAudio = data[0].audio.asset.url
        setAudio(myAudio)
        // setAudio(data[0].audio.asset.url)
        // console.log(audio.url)
        // imagem = cartas.image
        setLoading(false)
      })
      .catch(e =>{
        setError(e)
        // console.log(error)
      })
    
},[nCarta, error]);

  useEffect(() => {
   if(access == false) return navigate('/shop' )
  },[]);
  // console.log(carta);
  return(
    <div className="flex flex-col item-center justify-center p-5">
      <h1>Galeria</h1>
      {
        cartas ? cartas.map((carta) => <Carta className="p-12 p-12" pin={carta} key={carta} audio={carta.audio} />) : <Spinner message='Loading'/>
      }
      
      <div className="flex flex-col items-center justify-center">
       <div>
         <Audio audio={audio}/>
      
       </div>
       <div className="flex felx-row items-center justify-center">
         <button type="button"
          onClick={() => {
          setNCarta(nCarta - 1)
          }}
        ><FiArrowLeft
          className="bg-red m-3"
          />
        </button>
        <div>
          {nCarta}
        </div>
        <button
           onClick={() => {
           setNCarta(nCarta + 1)
          }}
        >< FiArrowRight 
          className="bg-red m-3"
        /> </button>
       </div>

      </div>
      
    </div>
    )
}

export default Galeria
