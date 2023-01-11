import SanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = SanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.REACT_APP_SANITY_TOKEN,
  useCdn: true,
})
const builder = imageUrlBuilder(client)

export const urlFor = ( source ) => builder.image( source );
