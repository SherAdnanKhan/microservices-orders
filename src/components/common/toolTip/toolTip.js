import React from "react"
import { useSelector } from "react-redux";
import Tooltip from "react-tooltip";
import { convertHexToRGBA } from "../../../utils/helperFunctions";

const ToolTip = ({ position, id }) => {
  const { feelColor } = useSelector(state => state.feelColor);

  return (
    <Tooltip
      backgroundColor={feelColor ? convertHexToRGBA(feelColor, 0.5) : convertHexToRGBA('#49C1D9', 0.5)}
      textColor="white"
      className="tooltip-style"
      place={position} id={id}>
    </Tooltip>
  )
}
export default ToolTip;
