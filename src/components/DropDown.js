import React from "react";
import "./DropDown.css";

function DropDown({ label, options, callback }) {
  return (
    <div className="dropdown">
      <label for="cars">{label}</label>
      <select onChange={callback}>
        {options.map((e) => (
          <option selected={e.selected} value={e.value}>
            {e.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
