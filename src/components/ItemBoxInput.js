import React from "react";
import "./ItemBoxInput.css";
import TextInput from "./TextInput";

function ItemBoxInput({ change }) {
  return (
    <div className="ItemBox__input">
      <div className="ItemBox__input__Input">
        <TextInput change={change} placeholder="Subject Name" type="text" />
        <TextInput change={change} placeholder="Class Name" type="number" />
        <TextInput
          change={change}
          placeholder="Number of pages"
          type="number"
        />
        <TextInput
          change={change}
          placeholder="Number of copies"
          type="number"
        />
      </div>
    </div>
  );
}

export default ItemBoxInput;
