import React, {useState, useEffect} from "react"
import { MdDownloadForOffline, MdUploadFile } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
// import MasonryLayout from '../../components';
import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data'
import { Spinner } from "../../components";

const PinDetail = ({user}) => {
  const [ pins, setPins ] =useState(null);
  const [ pinDetails, setPinDetails ] = useState(null);
  const [ comment, setComment ] = useState(null);
  const [ addingComment, setAddingComment ] = useState(false);

  const { pinId } = useParams();

const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment, 
          _key: uuidv4(), 
          postedBy: {
            _type: 'postedBy', 
            _ref: user._id } 
        }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

// console.log({comment})
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if(query){
      client.fetch(`${query}`)
        .then((data) =>{
          setPinDetails(data[0]);

          if(data[0]){
            const query1 = pinDetailMorePinQuery(data[0]);

            client.fetch( query1 )
              .then((res) => setPins(res))
          }
        })
    }
  } 

  useEffect(() => {
    fetchPinDetails();

  },[pinId])

      if( !pinDetails ) return <Spinner message="Loading Pins Details"/>
  
  return(
    <div className="flex xl-flex-row flex-col m-auto bg-white" style={{maxWidth: '1500px', borderRadius: '32px' }}>
      <div className="flex justify-center items-center md:items-start flex-initial ">
        <img src={pinDetails?.image && urlFor(pinDetails.image).url()} alt="user-post"
          className="rounded-md"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetails.image?.assets?.url}?dl=`}
              download
              onClick={(e)=> e.stopPropagation()}
              className="bg-white w-9 h-9 rounded-full"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetails.destination} target="blank" rel="noreferre">{pinDetails.destination.slice(8)}</a>
        </div>
        <div>
          <h1 className="text-4xl front-bold break-words mt-3">{
          pinDetails.title
          }</h1>
          <p className="mt-3">{pinDetails.about}</p>
        </div>
        <div>
        <Link to={`user-profile/${pinDetails.postedBy?._id}`} className="flex gap-2 items-center m-auto p-1">
         <img className="w-8 h-8 rounded-full object-cover" src={pinDetails.postedBy?.image} alt="user-img" target="blanc" />
          <p className="font.semibold capitalize">{pinDetails.postedBy?.userName}</p>
      </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetails?.comments?.map((comment, i ) => (
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
              <img src={comment.postedBy.image} alt="comments"
                className="w-10"
              />
              <div className="flex fex-col ">
                <p className="font-bold ">{comment.postedBy.userName}</p>
                <p>{comment.comment}</p>
              </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`user-profile/${pinDetails.postedBy?._id}`} className="flex gap-2 items-center m-auto p-1">
           <img className="w-8 h-8 rounded-full object-cover" src={pinDetails.postedBy?.image} alt="user-img" target="blanc" />
          </Link>
            <input 
              className="flex-1 border-grey-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              placeholder="Add a Comment"
              onChange={(e) => setComment(e.target.value)}
            type="text" 
            />
            <button
              type="button"
              className="bg-red-500 text-white p-4 rounded-full"
              onClick={addComment}
            >
              {addingComment ? 'Posting the Comment' : 'Post'}
            </button>

          </div>
        </div>
      </div>
    </div>
    )
}
export default PinDetail
