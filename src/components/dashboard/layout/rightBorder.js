import React from 'react';
import { useHistory } from 'react-router-dom';

const RightBorder = () => {
  const history = useHistory();

  return (
    <div className="right right-border">
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
