import React from "react"
import { useSelector } from "react-redux";
import Tooltip from "react-tooltip";


const ToolTip = ({ position, id }) => {
  const { feelColor } = useSelector(state => state.feelColor);
  return (
    <Tooltip
      backgroundColor={feelColor}
      textColor="white"
      className="tooltip-style"
      place={position} id={id}>
    </Tooltip>
  )
}
export default ToolTip;
