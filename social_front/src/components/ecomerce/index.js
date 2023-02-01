// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import { HeroBanner, Cart, FooterBanner,  Layout, NavbarCom } from '../../components';
import { client } from '../../client'
import { Spinner } from '../../components';


const Ecomerce = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({});
  const [bannerData, setBannerData] = useState("");

  useEffect(() => {
    setLoading(true)
    const query = '*[_type == "product"]'
    const netProducts = client.fetch(query)
      .then((data) =>{
        setProducts(data)
      })
    setLoading(false)
  },[]);

  useEffect(() => {
    setLoading(true)
    const bannerQuery = '*[_type == "banner"]'
    const netBanner = client.fetch(bannerQuery)
      .then((data) =>{
        setBannerData(data)
      })    
    setLoading(false)
  },[]);

  return(
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Produtos</h2>
        <p>Variedades</p>
      </div>
      {
        loading ? products.map((product)=> <p key={product.name}>{product.name}</p> ): <Spinner message="Loading Products"/>
      }
      <div className='products-container'>
      </div>
     <FooterBanner />
    </>
  )

}

export default Ecomerce;
