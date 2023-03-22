import React, { useReducer, useState } from 'react';
import axios from 'axios';
import cartas from './../../assets/images/cartas.jpeg';


const api = axios.create({
  baseURL:'https://api.mercadopago.com/'
})

api.interceptors.request.use(async config => {
  const token = process.env.REACT_APP_TOKEN_PUBLIC_API_MERCADO_PAGO_PUBLIC
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const Store = ({user}) => {
  const [formData /*state*/, setFormData /*action*/] = useReducer(formReducer, {});
  const [responsePayment, setResponsePayment] = useState(false);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);

  const myName = user.givenName +' '+ user.familyName;

  const handdleChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    })
  }


  const getStatusPayment = () => {
    api
      .get(`v1/payments/${responsePayment.data.id}`)
      .then(response => {
        if(response.data.status === 'approved'){
          setStatusPayment(true)
        }
      })
  }

  const handleSubmit = (e) => {
        e.preventDefault()
     const body = {
      "transaction_amount": 120,
      "description":"product",
      "payment_method_id":formData.method,
      "payer":{
        "email":formData.mail,
        "first_name":myName.split(' ')[0],
        "last_name":myName.split(' ')[1],
        "identification":{
          "type": "cpf",
          "number": formData.cpf,

        }
    
      },
      "notification_url":"https://eoy40un9l6uno1s.m.pipedream.net",
       
    }
      
    api.post('v1/payments', body)
      .then(response => {
              console.log(response);
      setResponsePayment(response)
      setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)

    }).catch(err => {
      alert(err)
    })
    
  }
      // console.log(formData);
  // console.log(responsePayment);
  // console.log(method);
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
        <button className='bg-[#ddd] p-1 text-blacka rounded-l rounded-r m-4' onClick={getStatusPayment}>verificar pagamento</button>
        }
        {
          linkBuyMercadoPago && !statusPayment &&
        <iframe src={linkBuyMercadoPago} className="w-[480px] h-[820px] mx-auto mb-10 rounded-xl" title= 'link_buy' />
        }
        {
        statusPayment && 
            <h1>compra aprovada</h1>
        }
        
        
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text" onChange={handdleChange} className='text-black text-center m-1 pl-1 rounded-lg' value={myName} />
          <input onChange={handdleChange} className='text-black m-1 pl-1 rounded-lg' type="text" name="mail" placeholder='mail' />
          <input onChange={handdleChange}  className='text-black m-1 pl-1 rounded-lg' type="text" name="cpf" placeholder="cpf" />
          <select className='text-black m-1 pl-1 rounded-lg' onChange={handdleChange} id="method" name="method">
            <option className='text-black m-1 pl-1 rounded-lg' name='' value=''>Opcao</option>
            <option className='text-black m-1 pl-1 rounded-lg' name='method' value='pix'>Pix</option>
            <option className='text-black m-1 pl-1 rounded-lg' name='method' value='credito'>Credito</option>
          </select>

          <input className='bg-[#DDD] m-1 text-black rounded-xl ' type="submit" value={"Pago"}  / >
        </form>
      </header>
    </div>
  );
}

export default Store;
