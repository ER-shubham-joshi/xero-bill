import React from "react";
import "./TextInput.css";

function TextInput({ placeholder, value, state, change, type, readOnly }) {
  return (
    <div className="Items">
      <input
        className="Items__input"
        placeholder={placeholder}
        type={type}
        disabled={state}
        value={value}
        onInput={change}
        readOnly={readOnly}
      ></input>
    </div>
  );
}

export default TextInput;
