import React from "react";
import "./ItemBoxInput.css";
import TextInput from "./TextInput";

function ItemBoxInput({ change }) {
  return (
    <div className="ItemBox__input">
      <div className="ItemBox__input__Input">
        <TextInput change={change} placeholder="Subject Name" />
        <TextInput change={change} placeholder="Class Name" />
        <TextInput change={change} placeholder="Number of pages" />
        <TextInput change={change} placeholder="Number of copies" />
      </div>
    </div>
  );
}

export default ItemBoxInput;
