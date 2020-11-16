import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Search from "../../dashboard/layout/search";
import { useSelector } from "react-redux";
import ToolTip from "../../common/toolTip/toolTip";

const VaultHeader = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);

  return (
    <>
      <div
        className="top"
        id="main-menu"
        style={{ backgroundColor: feelColor }}
      >
        <div className="d-flex" style={{ borderBottom: "1px solid black" }}>
          {/* <div className="logo-icon">
            <img className="valut-img" alt="" src="/assets/images/logowhite.png" />
          </div> */}
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.push('/settings')}>
              <i className="fas fa-ellipsis-v"
                data-for="menu"
                data-tip="menu settings" />
            </span>
            <ToolTip id="menu" position="bottom" />
          </div>
          <div className="search" id="search" style={{ textAlign: "center", width: "100%" }}>
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" data-for="search" data-tip='search' />
            <ToolTip id="search" position="bottom" />
          </div>
        </div>
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
      </div>
      <Search feelColor={feelColor} />

      <hr className="do-not-delete" />
    </>
  );
};

export default VaultHeader;
