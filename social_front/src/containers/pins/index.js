import React, {useState} from "react"
import { Routes, Route  } from 'react-router-dom';

import { Navbar, Feed, PinDetail, CreatePin, Search, Shop, Galeria, Store } from "../../components";

const Pins = ({user, pin}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <div className="">
      <div className="bg-gray-50">
        <Navbar searchterm={searchTerm} setSearchTerm={setSearchTerm} user={user && user}/>
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />}/>
          <Route path="/category/:categoryId" element={<Feed />}/>
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user}/>}/>
          <Route path="/create-pin/" element={<CreatePin user={user && user}/>}/>
          <Route path="/search" element={<Search searchTerm={searchTerm} />}/>
          <Route path="/shop" element={<Shop user={user && user} />}/>         
          <Route path="/store" element={<Store user={user && user} />}/>                   
          <Route path="/galeria" element={<Galeria user={user && user} />}/>          
        </Routes>
      </div>
    </div>
    )
}

export default Pins
