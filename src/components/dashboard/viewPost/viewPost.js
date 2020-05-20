import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getPost, makeStoke, unStoke } from "../../../actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import PostFooter from "./postFooter";
import ViewPortHead from "./postHead";
import ViewPostBody from "./postBody";
import ViewPostHeader from "./postHeader";
import Comment from './comments';


const ViewPost = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    postView: { post },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id]);

  const handleUnStoke = (e, ID) => {
    e.preventDefault();
    dispatch(unStoke(ID, id))
  }

  const handleStoke = (e, ID) => {
    e.preventDefault();
    dispatch(makeStoke(ID, id));
  }

  return (
    <div className="post-page">
      <ViewPostHeader post={post} />
      <ViewPortHead
        post={post}
      />
      <ViewPostBody
        post={post}
      />
      <PostFooter
        post={post}
        handleStoke={handleStoke}
        handleUnStoke={handleUnStoke}
      />
      <Comment />
    </div>
  )
}
export default ViewPost;