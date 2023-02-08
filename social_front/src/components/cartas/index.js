import React, {useState} from "react";
import { cartasMoreQuery, userQuery, searchQuery } from "../../utils/data";
import { client } from "../../client";
import Pin from '../pin';
import Spinner from "../spinner";

const Cartas = () => {
  const [loading, setLoading] = useState(false);
  const [cartas, setCartas] = useState('');
  
  useEffect(() => {
    setLoading(true)
    const query = cartasMoreQuery()

    client.fetch(query)
      .then((data) => {
        // console.log(data);
        setCartas(data)
        // imagem = cartas.image
        setLoading(false)
      })
    
  },[]);
  
  return(
    <div>
     {cartas ? cartas.map((carta) => <Pin pin={carta} key={carta.number} />) : <Spinner message='Loading'/>}
    </div>
    )
}

export default Cartas
