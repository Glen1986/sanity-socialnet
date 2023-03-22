import React, {useState} from "react";

const methods = (method) => {
  const handleSubmit = (e) => {
        e.preventDefault()
    
    const body = {
     
      "transaction_amount": 120,
      "description":"product",
      "payment_method_id":method,
      "payer":{
        "email":formData.mail,
        "first_name":myName.split(' ')[0],
        "last_name":myName.split(' ')[1],
        "identification":{
          "type": "cpf",
          "number": formData.cpf,
        }
     
      },
      // "notification_url":"https://eoy40un9l6uno1s.m.pipedream.net"
    }
    
    api.post('v1/payments', body)
      .then(response => {
      setResponsePayment(response)
      setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)
      // back_urls: {
      // success:'https://omundodadarthi.com.br/galeria/',
        // pending:'https://omundodadarthi.com.br/panding',
        // failure:'https:;//omundodadarthi.com.br/404'
    // },

    }).catch(err => {
      alert(err)
    })
  }
  return(
    
    )
}

export default methods
