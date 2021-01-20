import React, { useState } from "react";
import ItemBoxInput from "../components/ItemBoxInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "./Client.css";
import { Add } from "@material-ui/icons";
import ItemBoxDisplay from "../components/ItemBoxDisplay";

function Client({ clientName = "Convent School" }) {
  let [clientData, updateClientData] = useState([]);
  let [dataEntry, addEntry] = useState({});

  // Claculate the amount of the xerox
  let calcAmount = ({ pages, copies, ro1, ro2 }) => {
    let amount =
      Math.floor(pages / 2) * 2 * ro2 * copies +
      (pages - Math.floor(pages / 2) * 2) * copies * ro1;
    return amount;
  };

  // adds the row of data entry
  let addRow = (event) => {
    let amount = Object.keys(dataEntry).length ? calcAmount(dataEntry) : 0;
    addEntry((prevEntry) => {
      return Object.keys(dataEntry).length
        ? { ...prevEntry, ...{ amount } }
        : prevEntry;
    });
    updateClientData((prevData) => {
      return Object.keys(dataEntry).length
        ? [...prevData, dataEntry]
        : prevData;
    });
  };

  //handles the changes and store the values
  let change = (event) => {
    if (event.target.placeholder.includes("Subject")) {
      addEntry((prevData) => {
        let updatedObj = { subject: event.target.value };
        return { ...prevData, ...updatedObj };
      });
    }
    if (event.target.placeholder.includes("Class")) {
      addEntry((prevData) => {
        let updatedObj = { class: event.target.value };
        return { ...prevData, ...updatedObj };
      });
    }
    if (event.target.placeholder.includes("pages")) {
      addEntry((prevData) => {
        let updatedObj = { pages: event.target.value };
        return { ...prevData, ...updatedObj };
      });
    }
    if (event.target.placeholder.includes("copies")) {
      addEntry((prevData) => {
        let updatedObj = { copies: event.target.value };
        return { ...prevData, ...updatedObj };
      });
    }
    if (event.target.placeholder.includes("Rate of 1")) {
      addEntry((prevData) => {
        let updatedObj = { ro1: event.target.value };
        return { ...prevData, ...updatedObj };
      });
    }
    if (event.target.placeholder.includes("Rate of 2")) {
      addEntry((prevData) => {
        let updatedObj = { ro2: event.target.value };
        return { ...prevData, ...updatedObj };
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
            amount={row.amount}
            subject={row.subject}
            classs={row.classs}
            pages={row.pages}
            copies={row.copies}
            state={row.state}
          />
        ))}
      </div>
    </div>
  );
}

export default Client;
