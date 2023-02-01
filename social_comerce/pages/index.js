
import React, {useState} from "react";
import client from '../lib/client'

import { HeroBanner, Footer } from "@/components";


const Home = ({products, bannerData}) => (

    <>
      {console.log(bannerData)} 
      <HeroBanner  heroBanner={bannerData.length &&  bannerData[0]}/>
      <div className="products-heading">
        <h2>Mais Vendidos</h2>
        <p>Dolor hic lorem alias praesentium cumque. Repudiandae illum </p>
      </div>
      <div className="products-container">
        {products?.map(product => product.name)}

      </div>
      <Footer />
    </>
    );

export async function getServerSideProps() {
// export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props: {products, bannerData}
  }
}
export default Home

