const userQuery = ( userId ) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
}
export default userQuery;

export const searchQuery = ( searchterm ) => {

  const query =`*[_type == 'pin' && title match '${searchterm}*' || category match '${searchterm}*' || aout match '${searchterm}*']{
        image {
        asset -> {
        url
        }
        },
        _id,
        destination,
        postedBy -> {
        _id,
        userName,
        image
        },
        save[] {
        _key,
        postedBy -> {
        _id,
        userName,
        image
        },
      },
  }`;
  return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc){
 image {
        asset -> {
        url
        }
        },
        _id,
        destination,
        postedBy -> {
        _id,
        userName,
        image
        },
        save[] {
        _key,
        postedBy -> {
        _id,
        userName,
        image
        },
      },
}`;
