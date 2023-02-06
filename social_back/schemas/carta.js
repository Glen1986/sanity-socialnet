
export default {
  name: 'carta',
  title: 'Carta',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      of:[{ type: 'document' }]
    }
    ,
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of:[{ type: 'comment' }]
    }
  ]
}
