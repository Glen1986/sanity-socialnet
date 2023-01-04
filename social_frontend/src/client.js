import React from 'react'; 
// import { sanityClient } from "@sanity/client";
// import imageUrlBuilder from '@sanity/image-url';

// import myConfiguredSanityClient from './sanityClient'
// import imageUrlBuilder from '@sanity/image-url'

const sanityClient = require('@sanity/client');
// const builder = imageUrlBuilder(myConfiguredSanityClient)

const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-03',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: process.env.REACT_APP_SANITY_TOKEN
});

// export const urlFor = (source) => builder.image(source)
export default client

