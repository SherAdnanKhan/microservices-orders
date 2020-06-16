import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getPost, makeStoke, unStoke } from "../../../actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import PostFooter from "./postFooter";
import ViewPostHead from "./postHead";
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
    <div className={`post-page ${post && post.post.user.feel_color}`}>
      <ViewPostHeader
        post={post && post.post}
      />
      <ViewPostHead
        post={post && post.post}
      />
      <ViewPostBody
        post={post && post.post}
      />
      <PostFooter
        post={post}
        handleStoke={handleStoke}
        handleUnStoke={handleUnStoke}
      />
      <Comment post={post && post.post} />
    </div>
  )
}
export default ViewPost;