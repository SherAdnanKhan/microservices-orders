import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, createComment } from '../../../actions/postAction';
import Avatar from '../../common/avatar';

const Comment = ({ post }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.postView);

  const bottomRef = useRef();

  useEffect(() => {
    if (post) {
      dispatch(getComments(post.id))
    }
  }, [post, dispatch]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = () => {
    const data = {
      comment,
      post_id: post.id
    };

    dispatch(createComment(data));
    setComment('');
  };

  return (
    <>
      <div className="user-list-view">
        <div className="user-list-top">
          <div className="user-name">
            <p>Akif</p>
          </div>
          <div className="user-cude">
            <div className="artcubecase">
              <div className="procusmallmove">
                <div className="scenesmall">
                  <a href="studio.php?idstudio=4&gal=1">
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="user-link">
            <p>WebDesign/ <br /> Programmer </p>
          </div>

        </div>
        <div className="big-image">
          <img src="/assets/images/gray.png" alt="" />
          <div className="right-box">
          </div>
        </div>
        <div>
          <p>Second</p>
        </div>
        <div className="user-btns">
          <div>
            <img src="/assets/images/strokeiconem.png" alt="" />
            <p>1 stroke</p>
          </div>
          <div>
            <img className="open-commet" src="/assets/images/crit1.png" alt="" />
          </div>
          <div>
            <img src="/assets/images/ncommnicon.png" alt="" />
          </div>
        </div>
      </div>

      <div className="comments-box">
        <div className="comment-bar">
          <div className="commnent-img">
            <img src="/assets/images/gray.png" alt="" />
            <i className="fa fa-times close-comment"></i>
          </div>
          <div className="comment-sec">
            {comments &&
              comments.map((comment, index) => (
                <div className="user-commet" key={index}>
                  <div className="user-cude">
                    <Avatar
                      avatars={comment.user.avatars && comment.user.avatars}
                      feelColor={comment.user.feel_color}
                    />
                  </div>
                  <div className="comment-info">
                    <p>{comment.user.username} : <span>{comment.description}</span> </p>
                    <p> 20 h </p>
                  </div>
                </div>
              ))
            }
            <div className="botton" ref={ref => bottomRef.current = ref}></div>
          </div>
          <div className="text-area">
            <div className="msg-input">
              <textarea
                placeholder=" Add a critique..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="clickable">
              <img src="/assets/images/crit1.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
