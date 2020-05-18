import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getStokes,makeStoke ,unStoke} from "../../actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../common/spinner';

const ViewPost = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    postView: { post },
    loading: { loading }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getStokes(id))
  }, [dispatch,id]);
   
   const handleUnStoke = (e,ID) => {
      e.preventDefault();
      dispatch(unStoke(ID,id))
   }

   const handleStoke = (e,ID) => {
     e.preventDefault();
     dispatch(makeStoke(ID,id));
   }

return (
  <div className="post-page">
     {loading && <Spinner />}
     { post &&
        <div className="post-head"> 
          <p>Akif</p>
          {/* <div className="procu">
          { userStudio && userStudio.user && userStudio.user.avatars && <ProfileCube avatars={userStudio.user.avatars} />}
        </div> */}
          { post && post.post && post.post.art && post.post.art.parent && <p>{post.post.art.parent.name}/{post.post.art.name}</p>}
        </div>
     }
      <div className="post-body">
       { post && post.post && post.post.image && post.post.image.path && <img src={post.post.image.path} alt="" stye={{width:"100%", heigth:"100%"}} />}
      </div>
      <div className="post-footer">
        { post && post.post && post.post.title && <h3>{post.post.title}</h3> } 
        <div className="stoke-icon-div">
          { post && post.has_stroke ? ( 
          <div className="post-icon-set">
            <img className="post-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => handleUnStoke(e,post && post.post && post.post.id)}/>
            <h3>strokes 1</h3>
          </div>  
          ) : (
          <div className="post-icon-set">
            <img className="post-non-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => handleStoke(e,post && post.post && post.post.id)} />
            <h3>strokes 0</h3>
          </div>)
          } 
          <img className="stoke-non-color-icon" src="/assets/images/crit1.png" alt="" />
          <img className="stoke-non-color-icon" src="/assets/images/ncommnicon.png" alt="" />
        </div>
        { post && post.post && post.post.title && <h3>{post.post.title}</h3> } 
      </div>
    </div>
  )
}
export default ViewPost;