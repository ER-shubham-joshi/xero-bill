import React from "react";
import "./TextInput.css";

function TextInput({ placeholder, value, state, change }) {
  return (
    <div className="Items">
      <input
        className="Items__input"
        placeholder={placeholder}
        type="text"
        disabled={state}
        value={value}
        onInput={change}
      ></input>
    </div>
  );
}

export default TextInput;
