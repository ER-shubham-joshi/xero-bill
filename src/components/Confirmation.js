import React from "react";
import Button from "./Button";
import "./Confirmation.css";

function Confirmation({ text, handleYes, handleNo }) {
  return (
    <div className="confirmation">
      <p>{text}</p>
      <div className="confirmation__button">
        <Button callback={handleYes} text="YES" />
        <Button callback={handleNo} text="NO" />
      </div>
    </div>
  );
}

export default Confirmation;
