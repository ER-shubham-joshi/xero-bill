import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import TextInput from "../components/TextInput";
import "./ItemBoxDisplay.css";

function ItemBoxDisplay({
  id = 1,
  serailNo = 1,
  amount = 125,
  subject = "Mathematics",
  classs = "10th",
  pages = 5,
  copies = 10,
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
