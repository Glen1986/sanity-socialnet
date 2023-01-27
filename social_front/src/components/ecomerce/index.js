// eslint-disable-next-line
import React from 'react';
// function Header({ title }) {
  // return <h1>{title ? title : 'Default title'}</h1>;
// }

const Ecomerce = () => {
  return(
    <>
      HeroBanner
      <div>
        <h2>Produtos</h2>
        <p>Variedades</p>
      </div>

      <div>
        {['product1', 'product2'].map((product) => product)}
        
      </div>
    </>
  )
}
export default Ecomerce;
