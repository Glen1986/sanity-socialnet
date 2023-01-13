import React, {useState} from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Navbar, Feed, PinDetail, CreatePin, Search } from "../../components";

const Pins = ({user}) => {
  const [searchterm, setSearchTerm] = useState('');
  // const [savingPost, setSavingPost] = useState(false);

  // const navigate = useNavigate();

  // const { postedBy, image, _id, destination } = pin;

  // const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    // const deletePin = (id) => {
    // client
      // .delete(id)
      // .then(() => {
        // window.location.reload();
      // });
  // };
  return(
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchterm={searchterm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />}/>
          <Route path="/category/:categoryId" element={<Feed />}/>
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user}/>}/>
          <Route path="/create-pin" element={<CreatePin user={user}/>}/>
          <Route path="/search" element={<Search searchterm={searchterm} />}/>
        </Routes>
      </div>
    </div>
    )
}

export default Pins
