
// SDK do Mercado Pago
const mercadopago = require ('mercadopago');
// Adicione as credenciais
mercadopago.configure({
  access_token: process.env.REACT_APP_TOKEN_PUBLIC_API_MERCADO_PAGO_PUBLIC
});
