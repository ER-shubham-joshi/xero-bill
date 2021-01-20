import React from "react";
import "./Button.css";

function Button({ add, text, Icon }) {
  return (
    <div className="click__button">
      {Icon ? (
        <button type="button" onClick={add}>
          <Icon />
        </button>
      ) : (
        <button type="button">{text}</button>
      )}
    </div>
  );
}

export default Button;
