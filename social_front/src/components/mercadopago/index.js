import React from 'react'
// SDK do Mercado Pago
import mercadopago from 'mercadopago'
// const mercadopago = require ('mercadopago');
// Adicione as credenciais
mercadopago.configure({
  access_token: process.env.REACT_APP_TOKEN_PUBLIC_API_MERCADO_PAGO_PUBLIC
});
 export default mercadopago
