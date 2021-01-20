import React from "react";

function LabelInput({ labelName }) {
  return (
    <div className="label">
      <label className="label__input" for="first-name">
        {labelName}
      </label>
    </div>
  );
}

export default LabelInput;
