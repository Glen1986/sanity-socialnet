// schemas/user.js
export default {
  name: 'user',
	title: 'User',
  type: 'document',
  
  fields: [
     {
      name: 'userName',
      title: 'UserName',
      type: 'string'
    }
    ,
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    }
    ,
    {
      name: 'image',
      title: 'Image',
      type: 'string'
    },
    {
      name: 'access',
      title: 'Access',
      type: 'boolean',
      initialValue: false,
    }
  ]
}
