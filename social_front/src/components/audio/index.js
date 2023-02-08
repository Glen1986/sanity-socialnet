import React, {useState} from "react";
import ReactAudioPlayer from 'react-audio-player';
const Audio = ({audio}) => {
  return(
    <div>
        <ReactAudioPlayer
          src={audio}
        autoPlay
        controls
        className="flex flex-col items-center justify-center"
      />
    </div>
    )
}

export default Audio
