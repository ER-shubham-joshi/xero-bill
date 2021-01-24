import React from "react";
import "./MessageToast.css";

function MessageToast({ content }) {
  return (
    <div className="messageToast">
      <div className="messageToast_inner">
        <h4>{content}</h4>
      </div>
    </div>
  );
}

export default MessageToast;
