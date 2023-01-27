import React from "react";
import PhotoAlbum from "react-photo-album";

// import "yet-another-react-lightbox/styles.css";
// import { Pin } from '../../components'

const photos = [
  {src:'../../assets/cartas/10.jpg', width: 800, height: 600 }
]


const Galeria = ({user}) => {
  console.log(user);
  return(
    <div>
      <h1>Galeria</h1>
      <PhotoAlbum  photos={photos}/>
    </div>
    )
}

export default Galeria
