// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import { HeroBanner, Cart, FooterBanner,  Layout, NavbarCom } from '../../components';
import { client } from '../../client'


// function Header({ title }) {
  // return <h1>{title ? title : 'Default title'}</h1>;
// }
// console.log(client.datasets);
const Ecomerce = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {

    const query = '*[_type == "product"]'
    const netProducts = client.fetch(query)
      .then((data) =>{
        setProducts(data)
      })
    console.log(products);
  },[]);
  return(
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Produtos</h2>
        <p>Variedades</p>
      </div>
      {
        products ? products.map((product)=> <p>{product.name}</p> ): null
      }
      <div className='products-container'>
      </div>
     <FooterBanner />
    </>
  )

}
// export const getServerSideProps = async () => {
  // const query = '*[_type == "product"]'
  // const products = await client.fetch(query)
//
  // const bannerQuery = '*[_type === "banner"]'
  // const bannerData = await client.fetch(bannerQuery)
  // console.log(products, bannerData);
  // return{
    // props:{products, bannerData}
  // }
// }
export default Ecomerce;
