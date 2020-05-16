import React, { useEffect, Fragment } from 'react';
import { useRouteMatch } from "react-router-dom";
import { getStokes,makeStoke ,unStoke} from "../../actions/strokesAction";
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../common/spinner';

const Strokes = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    stoke: { strokes },
    loading: { loading }
  } = useSelector(state => state);
   
   function HandleUnStoke(e,ID){
      e.preventDefault();
      dispatch(unStoke(ID,id))
   }

   function HandleStoke(e,ID){
     e.preventDefault();
     dispatch(makeStoke(ID,id));
   }

  useEffect(() => {
    dispatch(getStokes(id))
  }, [dispatch,id]);
return (
  <div className="stokes-page">
     {loading && <Spinner />}
     {!loading && <Fragment>
    {
      strokes &&
      <div className="stoke-head"> 
        <p>Akif</p>
        {/* <StrokesCube avatars={strokes && strokes.post && strokes.post.image} /> */}
        {/* <Avatar avatars={strokes && strokes.post && strokes.post.image} /> */}
    { strokes && strokes.post && strokes.post.art && strokes.post.art.parent && <p>{strokes.post.art.parent.name}/{strokes.post.art.name}</p>}
   </div>
    }
   
   <div className="stoke-body">
   { strokes && strokes.post && strokes.post.image && strokes.post.image.path && <img src={strokes.post.image.path} alt="" stye={{width:"100%", heigth:"100%"}} />}
   </div>
   <div className="stoke-footer">
      { strokes && strokes.post && strokes.post.title && <h3>{strokes.post.title}</h3> } 
      <div className="stoke-icon-div">
        { strokes && strokes.has_stroke ? ( 
           <div className="stoke-icon-set">
             <img className="stoke-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => HandleUnStoke(e,strokes && strokes.post && strokes.post.id)}/>
             <h3>strokes 1</h3>
           </div>  ): (
           <div className="stoke-icon-set">
             <img className="stoke-non-color-icon" src="/assets/images/strokeiconem.png" alt="" onClick={(e) => HandleStoke(e,strokes && strokes.post && strokes.post.id)} />
             <h3>strokes 0</h3>
           </div> 
         )
      } 
        <img className="stoke-non-color-icon" src="/assets/images/crit1.png" alt="" />
        <img className="stoke-non-color-icon" src="/assets/images/ncommnicon.png" alt="" />
      </div>
      { strokes && strokes.post && strokes.post.title && <h3>{strokes.post.title}</h3> } 
   </div>
   </Fragment>}
  </div>
)
}
export default Strokes;