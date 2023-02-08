
export default {
  name: 'carta',
  title: 'Carta',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Number',
      type: 'number'
    },
    {
      name: 'nome',
      title: 'Nome',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: {
        accept:'audio/*'
      },
      of:[{ type: 'image' }]
    },
  ],
}
