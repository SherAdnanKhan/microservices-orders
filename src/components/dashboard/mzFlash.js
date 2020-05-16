import React from "react"
import { useSelector, useDispatch } from "react-redux"

const MzFlash = () => {
  const dispatch = useDispatch();
  const {
    studio: { userStudio }
  } = useSelector(state => state);

  return (
    <div className="mz-flash-page">
      <div className="mz-flash-head">
        <div className="fav-amount">
          <p>Amount Faves</p>
          <p>Amount Faving</p>
        </div>
        <div className="fav-cub">
          {/* <UserCube user={user}  />  */}
          <p>HaHa</p>
        </div>
        <div className="fav-btn-div">
         <button className="fav-btn">FAVE</button>
        </div>
      </div>
      <div className="fav-bar">
        <h3>MZ FLASH</h3>
      </div>
    </div>
  )

}
export default MzFlash;