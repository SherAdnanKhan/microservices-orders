import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getPost, strokePost, unstrokePost } from "../../../actions/postAction";
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
    postView: { post, comments },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id]);

  const handleUnStoke = () => {
    dispatch(unstrokePost(post.post.id, post.post.gallery_id))
  }

  const handleStoke = () => {
    dispatch(strokePost(post.post.id, post.post.gallery_id));
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
        post={post}
      />
      <PostFooter
        post={post}
        comments={comments}
        handleStoke={handleStoke}
        handleUnStoke={handleUnStoke}
      />
      <Comment post={post && post.post} />
    </div>
  )
}
export default ViewPost;