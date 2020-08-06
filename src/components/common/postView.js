import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const PostView = ({ avatars, feelColor = 'red' }) => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  return (
    <div>
      {/* {query?.postType === 1 &&
        <img src={params} alt="user Image" />
      }
      {
        query?.postType === 2 &&
        <video src={params}></video>
      } */}
      {params.image && <img src={params.image} alt="user Image" />}
      {params.video && <video src={params.video}></video>}

    </div>
  )
};

export default PostView;
