import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToolTip from '../../common/toolTip/toolTip';

const Footer = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);

  return (
    <div className="bottom"
      style={{ backgroundColor: feelColor }}
    >
      <div className="bottom-icons">
        <img
          className="strq-img"
          alt=""
          src="/assets/images/strqicon.png"
          onClick={() => history.push('/chat')}
          data-tip="strq"
          data-for="chat"
        />
        <ToolTip position="left" id="chat" />
        <img
          className="mzflash-img"
          alt=""
          src="/assets/images/mzflash.png"
          onClick={() => history.push('/mz-flash-group')}
          data-tip="mz-flash"
          data-for="mzflash"
        />
        <ToolTip position="left" id="mzflash" />
        <img
          className="lobby-img"
          alt=""
          src="/assets/images/lobbyicon.png"
          onClick={() => history.push('/lobby')}
          data-tip="lobby"
        />
        <ToolTip position="right" />
        <img
          className="mystudio-img"
          alt=""
          src="/assets/images/newstudioicon.png"
          onClick={() => history.push('/my-studio')}
          data-tip="my studio"
        />
        <ToolTip id="my" position="right" />
        <img
          className="add-img"
          alt=""
          src="/assets/images/add.png"
          onClick={() => history.push('/exhibition')}
          data-tip="add exhibit"
        />
        <ToolTip position="right" />
      </div>
    </div>
  );
};

export default Footer;
