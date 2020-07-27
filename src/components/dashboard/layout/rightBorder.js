import React from 'react';
import { useHistory } from 'react-router-dom';
import {userKey} from "../../../constants/keys";

const RightBorder = () => {
  const history = useHistory();
  const feelColor=JSON.parse(localStorage.getItem(userKey))
  return (
    <div
      className="right right-border"
      style={{ backgroundColor: feelColor.feel.color_code }}
    >
      <img
        alt=""
        src="/assets/images/strqicon.png"
        onClick={() => history.push('/dashboard/conversations')}
      />
      <img
        alt=""
        src="/assets/images/mzflash.png"
        onClick={() => history.push('/dashboard/mz-flash-group')}
      />
    </div>
  );
};

export default RightBorder;
