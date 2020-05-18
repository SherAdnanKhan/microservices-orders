import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getPost,makeStoke ,unStoke} from "../../../actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../../common/spinner';
import ViewFooter from "./viewPostFooter";
import ViewPortHead from "./viewPostHead";
import ViewPostBody from "./viewPostBody";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    postView: { post },
    loading: { loading }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch,id]);
   
   const handleUnStoke = (e,ID) => {
      e.preventDefault();
      dispatch(unStoke(ID,id))
   }

   const handleStoke = (e,ID) => {
     e.preventDefault();
     dispatch(makeStoke(ID,id));
   }

   console.log("post",post)


return (
  <div className="post-page">
     {loading && <Spinner />}
     <ViewPortHead 
        post={post} 
     />
     <ViewPostBody 
        post={post}
     />
     <ViewFooter 
        post={ post } 
        handleStoke={handleStoke} 
        handleUnStoke={handleUnStoke} 
     />
    </div>
  )
}
export default ViewPost;