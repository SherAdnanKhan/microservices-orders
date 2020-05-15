import React, {useEffect} from "react";
import {getFavas} from "../../actions/favasAction";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../common/avatar';

const Favas = () =>{
  const dispatch = useDispatch();
  const favas = useSelector(({ favas }) => favas?.favasList)

  useEffect(() => {
   dispatch(getFavas()) 
  }, [dispatch]);

  return (
    <div className="favas">
      <div className="favas-row">
        { favas?.map(( val,index ) => (
          <div className="favas-box">
             <div className="favas-avatar">
               <Avatar avatars={val?.avatars} />
             </div>
           <div>
             <p>{val?.first_name}</p>
             <p>{val?.art?.name}</p>
             <p>Faving Gallery</p>
             <p>2</p>
           </div>
         </div>
        ))}
      </div>
    </div>
  )
}
export default Favas;