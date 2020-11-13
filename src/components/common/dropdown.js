import React from 'react'

const Dropdown = ({ name, label, options, valueProperty, value, textProperty, error, ...rest }) => {
  return (
    <div className="dropdownMenu">
      {label &&
        <div className="input-group-prepend" >
          <label className="input-group-text" htmlFor={name}> {label} </label>
        </div>
      }
      <select value={value} id={name} name={name}  {...rest}>
        <option value="" >Please Select</option>
        {options && options.map((option, index) => (
          <option key={index} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback"> {error} </div>}
    </div>
  )
}

export default Dropdown
