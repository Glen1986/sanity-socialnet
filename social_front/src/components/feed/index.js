import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { feedQuery, searchQuery  } from "../../utils/data";

import { client } from "../../client";
import { Spinner, MasonryLayout } from "../../components";


const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();


  useEffect(()=>{
    setLoading(true)

    if(categoryId){
      const query = searchQuery(categoryId)

      client.fetch(query)
        .then((data)=> {
          setPins(data)
          setLoading(false)
        })
    }else{
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false)
        })

    }
  },[categoryId])

  

  if (loading) return <Spinner message=
    "we`r loading new Ideas..." 
    />
  if(!pins) return <h3 className="text-center">
    No Pins Available....
    </h3>
  return(
    <div>
     <h2 className="text-center text-4xl font-semibold mt-10 text-gray-900">
       Nossos Pins
     </h2>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
    )
}

export default Feed
