import React from "react";

import { Cancel } from "@material-ui/icons";
import Button from "./Button";

import "./Popup.css";

function Popup({ content, handleClose, confirmation }) {
  return (
    <div className="popup">
      <div
        className="popup__inner" //{confirmation ? "popup__inner__confirmation" : "popup__inner"}
      >
        <button className="closeButton" onClick={handleClose}>
          <Cancel />
        </button>
        {/* <Button callback={handleClose} Icon={Cancel} /> */}
        {content}
        {/* <button onClick={handleClose}>Cancel</button> */}
      </div>
    </div>
  );
}

export default Popup;
