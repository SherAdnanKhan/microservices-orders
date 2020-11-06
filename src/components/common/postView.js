import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


const PostView = ({ avatars, feelColor = 'red' }) => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  console.log("params=", params)


  return (
    <div className="postView_img">
      {params.image && <img src={params.image} alt="post" />}
      {params.video && <video src={params.video} controls></video>}
    </div>
  )
};

export default PostView;
