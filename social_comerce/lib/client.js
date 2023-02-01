// import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: '2ug4lf51',
  dataset: 'production',
  apiVersion: '2023-03-02',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
export default client
