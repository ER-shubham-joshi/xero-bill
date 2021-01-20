import React, { useState } from "react";
import ItemBoxInput from "../components/ItemBoxInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "./Client.css";
import { Add } from "@material-ui/icons";
import ItemBoxDisplay from "../components/ItemBoxDisplay";
import { useStateValue } from "../StateProvider";
import { calcAmount, calcTotalAmount } from "../reducer";

function Client({ clientName = "Convent School" }) {
  const [{ dataEntry, clientData = [] }, dispatch] = useStateValue();

  // adds the row of data entry
  let addRow = (event) => {
    if (Object.keys(dataEntry).length) {
      dispatch({
        type: "ADD_CLIENT_DATA",
      });
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: {},
      });
    }
  };

  //handles the changes and store the values
  let change = (event) => {
    let {
      target: { placeholder },
    } = event;
    if (placeholder.includes("Subject")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { subject: event.target.value },
      });
    }
    if (placeholder.includes("Class")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { classs: event.target.value },
      });
    }
    if (placeholder.includes("pages")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { pages: event.target.value },
      });
    }
    if (placeholder.includes("copies")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { copies: event.target.value },
      });
    }
    if (placeholder.includes("Rate of 1")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { ro1: event.target.value },
      });
    }
    if (placeholder.includes("Rate of 2")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { ro2: event.target.value },
      });
    }
  };
  return (
    <div className="client">
      <div className="client__header__sticky">
        <div className="client__header__one">
          <div className="client__header__left">
            <h1>{clientName}</h1>
          </div>
          <div className="client__header__right">
            <TextInput
              id="Rate1"
              name="nCopies"
              placeholder="Rate of 1 page in rupee"
              change={change}
            />
            <TextInput
              id="Rate2"
              name="nCopies"
              placeholder="Rate of 2 page in rupee"
              change={change}
            />
          </div>
        </div>
        <div className="client__header__two">
          <ItemBoxInput change={change} />
          <Button add={addRow} Icon={Add} />
        </div>
        <hr></hr>
      </div>

      <div className="client__body__header">
        <p>S.NO.</p>
        <p>SUBJECT</p>
        <p>CLASS</p>
        <p>PAGES</p>
        <p>COPIES</p>
        <p>AMOUNT</p>
      </div>
      <div className="client__body__body">
        {clientData.map((row) => (
          <ItemBoxDisplay
            id={row.id}
            serailNo={clientData.indexOf(row) + 1}
            amount={calcAmount(row)}
            subject={row.subject}
            classs={row.classs}
            pages={row.pages}
            copies={row.copies}
            state={row.state}
          />
        ))}
      </div>
      <div className="client__body__footer">
        <hr></hr>
        <p>Total : ₹{calcTotalAmount(clientData)}</p>
      </div>
    </div>
  );
}

export default Client;
