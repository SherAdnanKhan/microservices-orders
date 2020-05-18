import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getStokes,makeStoke ,unStoke} from "../../actions/strokesAction";
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../common/spinner';

const ViewPost = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    stoke: { strokes },
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
     { strokes &&
        <div className="post-head"> 
          <p>Akif</p>
          {/* <StrokesCube avatars={strokes && strokes.post && strokes.post.image} /> */}
          {/* <Avatar avatars={strokes && strokes.post && strokes.post.image} /> */}
          { strokes && strokes.post && strokes.post.art && strokes.post.art.parent && <p>{strokes.post.art.parent.name}/{strokes.post.art.name}</p>}
        </div>
     }
      <div className="post-body">
       { strokes && strokes.post && strokes.post.image && strokes.post.image.path && <img src={strokes.post.image.path} alt="" stye={{width:"100%", heigth:"100%"}} />}
      </div>
      <div className="post-footer">
        { strokes && strokes.post && strokes.post.title && <h3>{strokes.post.title}</h3> } 
        <div className="stoke-icon-div">
          { strokes && strokes.has_stroke ? ( 
          <div className="post-icon-set">
            <img className="post-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => handleUnStoke(e,strokes && strokes.post && strokes.post.id)}/>
            <h3>strokes 1</h3>
          </div>  
          ) : (
          <div className="post-icon-set">
            <img className="post-non-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => handleStoke(e,strokes && strokes.post && strokes.post.id)} />
            <h3>strokes 0</h3>
          </div>)
          } 
          <img className="stoke-non-color-icon" src="/assets/images/crit1.png" alt="" />
          <img className="stoke-non-color-icon" src="/assets/images/ncommnicon.png" alt="" />
        </div>
        { strokes && strokes.post && strokes.post.title && <h3>{strokes.post.title}</h3> } 
      </div>
    </div>
  )
}
export default ViewPost;