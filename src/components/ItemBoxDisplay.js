import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import TextInput from "../components/TextInput";
import "./ItemBoxDisplay.css";

function ItemBoxDisplay({
  id = Math.floor(Math.random() * 10000),
  serailNo = "-",
  amount = "-",
  subject = "-",
  classs = "-",
  pages = "-",
  copies = "-",
  state = false,
}) {
  return (
    <div id={id} className="itemBox__display">
      <div className="itemBox__display__input">
        <p>{serailNo}.</p>
        <TextInput placeholder="Subject Name" value={subject} state={state} />
        <TextInput placeholder="Class Name" value={classs} state={state} />
        <TextInput placeholder="Number of pages" value={pages} state={state} />
        <TextInput
          placeholder="Number of copies"
          value={copies}
          state={state}
        />
        <p>₹{amount}</p>
      </div>
      <div className="itemBox__display__buttons"></div>
    </div>
  );
}

export default ItemBoxDisplay;
