import {
  GET_POST,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  GET_COMMENTS,
  GET_NCOMM,
  CLEAR_NCOMM,
  CLEAR_POST,
  CHANGE_CRITIQUES_STATUS,
  SHARE_POST_STRQ,
  CLEAR_STATUS,
  DELETE_POST,
  CHANGE_STATUS,
  CLEAR_COMMENTS
} from '../constants/actionTypes';
import http from '../services/httpService';
import socket from '../services/socketService';
import { getCurrentUser } from './authActions';
import {
  POST_COMMENT,
  POST_REPOSTED,
  POST_STROKE,
  POST_UNSTROKE
} from '../constants/keys';
import { toast } from 'react-toastify';

export const getPost = (post) => dispatch => {
  http
    .get(`/posts/${post}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_POST,
          payload: res.data.data
        });
      }
    });
};

export const clearPost = () => {
  return { type: CLEAR_POST };
}

export const strokePost = (postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: STROKE_POST,
    payload: {
      postId: postId,
      galleryId: galleryId,
      value: true
    }
  });

  http
    .post('/post/stroke', { post_id: postId })
    .then(() => {
      if (currentUser.id !== user.id) {
        socket.emit('onUserNotifications', { sender: currentUser, reciever: user }, POST_STROKE);
      }
    })
    .catch(() => {
      // dispatch({
      //   type: UNSTROKE_POST,
      //   payload: {
      //     postId: postId,
      //     galleryId: galleryId,
      //     value: false
      //   }
      // });
    });
};

export const unstrokePost = (postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: UNSTROKE_POST,
    payload: {
      postId: postId,
      galleryId: galleryId,
      value: false
    }
  });

  http
    .post('/post/unstroke', { post_id: postId })
    .then(() => {

      if (currentUser.id !== user.id) {
        socket.emit('onUserNotifications', { sender: currentUser, reciever: user }, POST_UNSTROKE);
      }
    })
    .catch(() => {
      // dispatch({
      //   type: STROKE_POST,
      //   payload: {
      //     postId: postId,
      //     galleryId: galleryId,
      //     value: true
      //   }
      // });
    });
};

export const createComment = (data, postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  http
    .post('/comments', data)
    .then(res => {
      dispatch({
        type: ADD_POST_COMMENT,
        payload: { comment: res.data.data.comment, postId, galleryId }
      });
      if (currentUser.id !== user.id) {
        socket.emit('onUserNotifications', { sender: currentUser, reciever: user }, POST_COMMENT);
      }
    });
};

export const standardSharePost = (postId) => dispatch => {
  http
    .post(`/post/share/${postId}`)
}

export const reportPost = (postId) => dispatch => {
  http
    .post(`/post/report/${postId}`)
    .then(res => {
      toast.success("Post Reported Successfully");
    });
}

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  }
};

export const getComments = postId => dispatch => {
  http
    .get(`/comments/${postId}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data.data
      });
    });
};

export const deletePost = (post, history) => dispatch => {

  http
    .delete(`/post/${post.id}`)
    .then(res => {
      toast.success("Post Deleted Successfully");
      if (history) {
        history.push("/my-studio")
      }
      dispatch({
        type: DELETE_POST,
        payload: post.id
      })
    });
};


export const getNcomm = slug => dispatch => {
  http
    .get(`/post/ncomm/${slug}`)
    .then(res => {
      dispatch({
        type: GET_NCOMM,
        payload: res.data.data.ncom_posts
      });
    });
};

export const clearNcomm = () => {
  return {
    type: CLEAR_NCOMM,
  };
};
export const changeCritqueStatus = (post, status) => dispatch => {
  const postObject = {
    critiques_status: status
  }

  http
    .post(`/post/critiques/${post.id}`, postObject)
    .then(res => {
      if (res.data.success) {
        if (status === 0) {
          toast.success(`You have Successfully Turn Off Critiques on ${post.title}`)
        }
        else {
          toast.success(`You have Successfully Turn On Critiques on ${post.title}`)

        }
        dispatch({
          type: CHANGE_CRITIQUES_STATUS,
          payload: res.data.data.post
        });
      }
    }).catch((err) => {
      toast.error("Something went wrong")
    });
};

export const sharePostOnStrq = (post, userId) => dispatch => {
  const postObject = {
    send_to: userId
  }
  dispatch({
    type: SHARE_POST_STRQ,
    payload: userId
  });

  http
    .post(`/post/share/${post.id}`, postObject)
    .then(res => {
      if (res.data.success) {
        toast.success(`post shared successfully`)
        dispatch({
          type: CHANGE_STATUS,
          payload: userId
        });
      }
      else {
        toast.warning("Something went wrong")
      }
    });
};
export const clearStatus = () => {
  return {
    type: CLEAR_STATUS,
  };
};
export const repost = (post, gallery) => dispatch => {
  const repostObject = {
    gallery_id: gallery.id,
    post_id: post?.id
  };

  http
    .post(`/post/repost`, repostObject)
    .then(res => {
      if (res.data.success) {
        toast.success(`Post Shared in Gallery Named ${gallery.title}`);
        const currentUser = getCurrentUser();
        if (currentUser.id !== post?.user.id) {
          socket.emit('onUserNotifications', { sender: currentUser, reciever: post?.user }, POST_REPOSTED);
        }
      }
      else {
        toast.error("Something went wrong");
      }
    });
}
export const shareMzFlash = (post) => dispatch => {
  const postObject = {
    post_id: post.id
  }

  http
    .post(`post/to-mzflash`, postObject)
    .then(res => {
      if (res.data.success) {
        toast.success(`post named ${post.title} shared in Mzflash`)
      }
      else {
        toast.warning("Something went wrong")
      }
    });
};
export const storeVault = (post) => dispatch => {
  const vaultObject = {
    vaultable_id: post.id,
    vaultable_type: 1
  }

  http
    .post(`vault`, vaultObject)
    .then(res => {
      if (res.data.success) {
        toast.success(`post ${post.title} saved in vault`)
      }

    })
    .catch(error => toast.error(error.response.data.errors.message))
};



