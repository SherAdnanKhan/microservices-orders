import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Search from './search';
import { useSelector } from "react-redux";
import ToolTip from "../../common/toolTip/toolTip";
import FeedBackModal from '../../common/feedbackModal.js';

const Header = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);
  const [showSearch, setShowSearch] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const location = useLocation();
  const url = location?.pathname?.split('/')[1];

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  }
  const toggleFeedbackModal = (value) => {
    setShowFeedbackModal(value);
  }
  return (
    <>
      {showFeedbackModal &&
        <FeedBackModal onCancel={toggleFeedbackModal} />
      }
      <div
        className="top"
        id="main-menu"
        style={{ backgroundColor: feelColor }}
      >
        <div className="contentFit d-flex">
          <div className="logo-icon">
            <img className="valut-img" alt="" src="/assets/images/logowhite.png" />
          </div>
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.push('/settings')}>
              <i className="fas fa-ellipsis-v"
                data-for="menu"
                data-tip="menu settings" />
            </span>
            <ToolTip id="menu" position="bottom" />
          </div>
          <div className="left-icon">
            <img className="valut-img"
              alt="" src="/assets/images/lobbyicon.png"
              onClick={() => history.push('/lobby')}
              data-for="lobby-header"
              data-tip="lobby"
            />
            <ToolTip id="lobby-header" position="bottom" />
            <img className="valut-img"
              alt="" src="/assets/images/newstudioicon.png"
              onClick={() => history.push('/my-studio')}
              data-tip="my studio"
              data-for="myStudio"
            />
            <ToolTip id="myStudio" position="bottom" />
            <img className="valut-img"
              alt=""
              src="/assets/images/add.png"
              onClick={() => history.push('/exhibition')}
              data-for="addExhibit"
              data-tip="add exhibit"
            />
            <ToolTip id="addExhibit" position="bottom" />
          </div>
          <div
            className="search"
            id="search"
            onClick={handleToggleSearch} >
            <img
              src="/assets/images/icons/searchicon.png"
              alt="search Icon"
              data-for="search"
              data-tip='search'
            />
            <ToolTip id="search" position="bottom" />
          </div>
          <div className="feedback-section">
            <button onClick={() => toggleFeedbackModal(true)} >
              Give Feedback
            </button>
          </div>
          <div className="right-icon">
            <img className="valut-img"
              alt=""
              src="/assets/images/strqicon.png"
              onClick={() => history.push('/chat')}
              data-for="Chat"
              data-tip="strq"
            />
            <ToolTip id="Chat" position="bottom" />
            <img className="valut-img"
              alt=""
              src="/assets/images/mzflash.png"
              onClick={() => history.push('/mz-flash-group')}
              data-for="mzflash-top"
              data-tip="mz flash"
            />
            <ToolTip id="mzflash-top" position="bottom" />
          </div>
        </div>
        {url !== "chat" &&
          <>
            <Link
              to=""
              className="feelIcon"
              style={{
                backgroundColor: feelColor
              }}
            >
              <img alt="" src="/assets/images/icons/feelicon.png"
                data-for="feelColor"
                data-tip="feel color" />
            </Link>
            <ToolTip position="left" id="feelColor" />
          </>
        }
      </div>
      <Search
        feelColor={feelColor}
        onToggleSearch={handleToggleSearch}
        showSearch={showSearch}
      />
      <hr className="do-not-delete" />
    </>
  );
};

export default Header;

