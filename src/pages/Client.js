import React, { useState, useEffect } from "react";
import ItemBoxInput from "../components/ItemBoxInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "./Client.css";
import { Add, Delete, Save } from "@material-ui/icons";
import ItemBoxDisplay from "../components/ItemBoxDisplay";
import { useStateValue } from "../StateProvider";
import { calcAmount, calcTotalAmount } from "../reducer";
import { db } from "../firebase";

function Client() {
  const [
    { user, dataEntry, clientData, clientName },
    dispatch,
  ] = useStateValue();

  let formattedClientName = clientName?.replaceAll(" ", "");

  // set client data from DB
  useEffect(() => {
    db.collection("clientData").onSnapshot((snapshot) => {
      snapshot.docs.length &&
        dispatch({
          type: "SET_CLIENT_DATA",
          clientData: snapshot.docs
            .map((doc) => doc.data())
            .filter((e) => {
              if (e[formattedClientName]) {
                return true;
              }
            })[0]?.[formattedClientName],
        });
    });
  }, []);

  // adds the row of data entry
  let addRow = (event) => {
    if (Object.keys(dataEntry).length) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: {
          id: Date.now(),
        },
      });
      dispatch({
        type: "ADD_CLIENT_DATA",
      });
    }
  };

  // delete all the client data
  let deleteClientData = () => {
    dispatch({
      type: "DELETE_CLIENT_DATA",
    });
    dispatch({
      type: "RESET_DATA_ENTRY",
    });
  };

  let saveClientData = () => {
    db.collection("clientData")
      .doc(user.uid)
      .set(
        {
          [formattedClientName]: clientData,
        },
        { merge: true }
      );
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
          <Button callback={addRow} Icon={Add} />
          <Button callback={deleteClientData} Icon={Delete} />
          <Button callback={saveClientData} Icon={Save} />
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
        {clientData
          ?.sort((a, b) => a.classs - b.classs)
          .map((row, i) => (
            <ItemBoxDisplay
              id={row.id}
              serailNo={i + 1}
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
