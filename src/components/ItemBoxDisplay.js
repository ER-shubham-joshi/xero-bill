import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import TextInput from "../components/TextInput";
import "./ItemBoxDisplay.css";
import Button from "../components/Button";
import { useStateValue } from "../StateProvider";

function ItemBoxDisplay({
  id,
  serailNo,
  amount,
  subject,
  classs = "-",
  pages,
  copies,
  state = false,
}) {
  const [, dispatch] = useStateValue();
  let deleteRow = () => {
    dispatch({ type: "DELETE_DATA_ENTRY", id });
  };
  return (
    <div className="itemBox__display">
      <div className="itemBox__display__input">
        <p>{serailNo}.</p>
        <TextInput
          placeholder="Subject Name"
          value={subject}
          state={state}
          type="text"
          readOnly="true"
        />
        <TextInput
          placeholder="Class Name"
          value={classs}
          state={state}
          type="text"
          readOnly="true"
        />
        <TextInput
          placeholder="Number of pages"
          value={pages}
          state={state}
          type="number"
          readOnly="true"
        />
        <TextInput
          placeholder="Number of copies"
          value={copies}
          state={state}
          type="number"
          readOnly="true"
        />
        <p>₹{amount}</p>
        <Button callback={deleteRow} Icon={Delete} />
      </div>
    </div>
  );
}

export default ItemBoxDisplay;
