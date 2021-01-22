import React from "react";
import "./Button.css";

function Button({ callback, text, Icon }) {
  return (
    <div className="click__button">
      {Icon ? (
        <button type="button" onClick={callback}>
          <Icon />
        </button>
      ) : (
        <button type="button" onClick={callback}>
          {text}
        </button>
      )}
    </div>
  );
}

export default Button;
