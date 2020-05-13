import React from "react";
import Autocomplete from "react-autocomplete";

const InputAutoComplete = ({ columeName, ListArray, ItemId, valueToDisplay, value, valueSetter, Change, Select}) =>{
  return ( 
  <Autocomplete
  inputProps={{ 
    style:
    {
      width: '90%',
      color:"white",
      backgroundColor:"black",
      borderRadius:"8px",
      border: "1px solid white",
      padding:"10px 5px",
      margin:"5px auto"
    }
        }}
    getItemValue={(item) => item[columeName] ? item[columeName] : ""}
    items={ListArray ? ListArray : [] }
    renderItem={(item, isHighlighted) =>
      <div key={item[ItemId]} style={{ background: isHighlighted ? 'white' : "black",color: isHighlighted ? "black" : "white" }}>
        {item[columeName]}
      </div>
   }
  value={valueToDisplay}
  onChange={(e) => Change(e)}
  onSelect={(val,item) => Select(val,item) }
  />)
}
export default InputAutoComplete