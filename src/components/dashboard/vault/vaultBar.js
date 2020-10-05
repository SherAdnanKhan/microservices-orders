import React from "react";
import ToolTip from "react-tooltip";
const VaultBar = ({ feelColor, onBack }) => {

  return (
    <div className="vault-bar" style={{ backgroundColor: feelColor }} >
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={onBack} />
      </div>
      <div className="heading">
        <p> Vault</p>
      </div>
      <div className="total-post" style={{ marginLeft: "auto" }}>
        <div className="icon-side">
          <>
            <i className="fas fa-square" data-for="fullView" data-tip="full view" />
            <ToolTip position="bottom" id="fullView" />
            <i className="fas fa-th" data-for="partialView" data-tip="partial view" />
            <ToolTip position="bottom" id="partialView" />
          </>
        </div>
      </div>
    </div>

  )
}
export default VaultBar;

