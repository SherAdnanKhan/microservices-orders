import React from 'react';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";

const StudioHeader = ({ myStudio, feelColor }) => {
  const history = useHistory();

  return (
    <div
      className="header-bar"
      style={{ backgroundColor: feelColor }}
    >
      <div className="back-icon">
        <i
          className="fa fa-arrow-left clickable"
          onClick={() => history.push('/lobby')}
          data-tip="back"
          data-for="back"
        />
        <ToolTip position="bottom" id="back" />
      </div>
      {myStudio && <p>{myStudio.user.username}</p>}
      <div className="actions" >
        <img
          src='/assets/images/sprfvs_full.png'
          alt=""
          className="clickable"
          onClick={() => history.push(`/my-studio/sprfvs/${myStudio?.user?.slug}`)}
          data-tip="Sprfvs list"
          data-for="mySprfvs"

        />
        <ToolTip position="left" id="mySprfvs" />
      </div>
    </div>
  );
};

export default StudioHeader;
