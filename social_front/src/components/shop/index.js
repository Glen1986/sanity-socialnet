
import React, { useReducer, useState } from 'react';
import axios from 'axios';
import cartas from './../../assets/images/cartas.jpeg';

const api = axios.create({
  baseURL:'https://api.mercadopago.com'
})
api.interceptors.request.use(async config => {
  const token = process.env.REACT_APP_TOKEN_PUBLIC_API_MERCADO_PAGO_PUBLIC
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// const mercadopago = require('mercadopago')
// mercadopago.configure({
  // access_token: process.env.TOKEN_PUBLIC_API_MERCADO_PAGO
// })
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}
function Shop({user}) {
  // const userName = localStorage.getItem('user')
  // console.log(userName);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [responsePayment, setResponsePayment] = useState(false);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);

  const handdleChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value
    })
  }

  const getStatusPayment = () => {
    api
      .get(`v1/payments/${responsePayment.data.id}`)
      .then(response => {
        if(response.data.status === 'approved'){
        }
      })
  }

  const handleSubmit = (e) => {
    console.log(formData);
        e.preventDefault()
    const body = {
      "transaction_amount": 2,
      "description":"product",
      "payment_method_id":"pix",
      "payer":{
        "email":"escobarglen@gmail.com",
        "first_name":"",
        "last_name":'',
        "identification":{
          "type": "cpf",
          "number": "123456",
        }
      },
      "notification_url":"https://eoy40un9l6uno1s.m.pipedream.net"
    }
    
    api.post('v1/payments', body).then(response => {
      setResponsePayment(response)
      setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)

    }).catch(err => {
      alert(err)
    })
  }
  // console.log(responsePayment)
  return (
    <div className="flex flex-col w-[100%] text-center">
      <header className="mx-auto">
        {
        !linkBuyMercadoPago &&
        <img className='mx-auto border border-[#ddd] rounded-xl my-6 w-60 ' src={cartas}/>
        }
        <h2 className='my-4 text-lg bg-[#ddd] rounded-xl p-4'>Pagamento com MercadoPago</h2>
        {
        !responsePayment && <form onSubmit={handleSubmit} /> 
        }
        {
          responsePayment &&
        <button className='bg-[#ddd] p-1 text-black' onClick={getStatusPayment}>verificar pagamento</button>
        }
        {
          linkBuyMercadoPago && !statusPayment &&
        <iframe src={linkBuyMercadoPago} className="w-[480px] h-[820px] mx-auto" title= 'link_buy' />
        }
        {
        statusPayment && 
            <h1>compra aprovada</h1>
        }
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text" onChange={handdleChange} className='text-black text-center m-1 pl-1 rounded-lg' value={user?.userName} />
          <input onChange={handdleChange} className='text-black m-1 pl-1 rounded-lg' type="text" name="mail" placeholder='mail' />
          <input onChange={handdleChange}  className='text-black m-1 pl-1 rounded-lg' type="text" name="cpf" placeholder="cpf" />
          <input className='bg-[#DDD] m-1 text-black rounded-xl ' type="submit" value={"Pago"}  / >
        </form>
      </header>
    </div>
  );
}

export default Shop;
