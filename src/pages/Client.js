import React, { useState, useEffect } from "react";
import ItemBoxInput from "../components/ItemBoxInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "./Client.css";
import { Add, Delete, Save, Print, ArrowBack } from "@material-ui/icons";
import ItemBoxDisplay from "../components/ItemBoxDisplay";
import { useStateValue } from "../StateProvider";
import { calcAmount, calcTotalAmount } from "../reducer";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import MessageToast from "../components/MessageToast";
import Popup from "../components/Popup";
import Confirmation from "../components/Confirmation";
import DropDown from "../components/DropDown";

function Client() {
  const history = useHistory();
  let [{ user, dataEntry, clientData, clientName }, dispatch] = useStateValue();
  let [notify, setNotify] = useState(false);
  let [deletePop, setDeletePop] = useState(false);
  let [messageToast, setMessageToast] = useState("");
  let [sortBy, setSortBy] = useState("");

  clientName = clientName
    ? clientName
    : window.sessionStorage.getItem("clientName");

  let formattedClientName = clientName?.replaceAll(" ", "");

  // set client data from DB
  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_NAME",
      client: clientName,
    });
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
    let mandatory = ["subject", "pages", "copies", "ro1", "ro2"];
    let missingKeys = [];
    missingKeys = mandatory.filter((e) => {
      return !dataEntry[e];
    });

    if (missingKeys.length) {
      setMessageToast(`${missingKeys} is mandatory field`);
      return notification();
    }

    dispatch({
      type: "SET_DATA_ENTRY",
      dataEntry: {
        id: Date.now(),
      },
    });
    dispatch({
      type: "ADD_CLIENT_DATA",
    });
  };

  // delete all the client data
  let deleteClientData = () => {
    dispatch({
      type: "DELETE_CLIENT_DATA",
    });
  };

  // save all the entries
  let saveClientData = () => {
    db.collection("clientData")
      .doc(user.uid)
      .set(
        {
          [formattedClientName]: clientData,
        },
        { merge: true }
      );
    setMessageToast("Your entires has been saved successfully");
    notification();
  };

  const printBill = () => {
    window.print();
  };

  const notification = () => {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  };

  const openPop = () => {
    setDeletePop(true);
  };

  const closePop = () => {
    setDeletePop(false);
  };

  const sortAsPer = (clientData, sortBy) => {
    if (sortBy === "Name") {
      return clientData.sort((a, b) => a.subject.localeCompare(b.subject));
    }
    if (sortBy === "Class") {
      return clientData.sort((a, b) => a.classs - b.classs);
    }
    return clientData;
  };

  //handles the changes and store the values
  let change = (event) => {
    let {
      target: { placeholder },
    } = event;
    if (placeholder.includes("Subject")) {
      dispatch({
        type: "SET_DATA_ENTRY",
        dataEntry: { subject: event.target.value?.toUpperCase() },
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
          <Button
            callback={() => {
              history.push("/");
            }}
            Icon={ArrowBack}
          />
          <div className="client__header__left">
            <h1>{clientName}</h1>
          </div>
          <div className="client__header__right">
            <TextInput
              id="Rate1"
              name="nCopies"
              placeholder="Rate of 1 page in rupee"
              change={change}
              type="number"
            />
            <TextInput
              id="Rate2"
              name="nCopies"
              placeholder="Rate of 2 page in rupee"
              change={change}
              type="number"
            />
          </div>
        </div>
        <div className="client__header__two">
          <ItemBoxInput change={change} />
          <Button callback={addRow} Icon={Add} />
          <Button callback={openPop} Icon={Delete} />
          <Button callback={saveClientData} Icon={Save} />
          <Button callback={printBill} Icon={Print} />
          <DropDown
            callback={(e) => {
              setSortBy(e.target.value);
            }}
            label="Sort by : "
            options={[
              { value: "Name" },
              { value: "Class" },
              { value: "None", selected: true },
            ]}
          />
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
        {sortAsPer(clientData, sortBy).map((row, i) => (
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
      <div className="delete__popup">
        {deletePop && (
          <Popup
            confirmation="true"
            content={
              <Confirmation
                handleYes={() => {
                  deleteClientData();
                  closePop();
                }}
                handleNo={() => {
                  closePop();
                }}
                text="Do you want to delete all the entries ?"
              />
            }
            handleClose={closePop}
          />
        )}
      </div>
      {notify && <MessageToast content={messageToast} />}
      <div className="client__body__footer">
        <hr></hr>
        <p>Total : ₹{calcTotalAmount(clientData)}</p>
      </div>
    </div>
  );
}

export default Client;
