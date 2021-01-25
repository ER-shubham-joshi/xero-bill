import React, { useState } from "react";

import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

import SchoolTile from "./SchoolTile";

import NewCustomer from "./NewCustomer";

import MessageToast from "./MessageToast";

import Popup from "./Popup";

import "./AddCustomer.css";

import { useStateValue } from "../StateProvider";

import Confirmation from "./Confirmation";

import { db } from "../firebase";

function AddCustomer() {
  const [
    { clients, user, sortBy, clientToBeDeleted },
    dispatch,
  ] = useStateValue();

  const [newClient, setNewClient] = useState(false);

  let [notify, setNotify] = useState(false);

  let [deletePop, setDeletePop] = useState(false);

  const openPop = () => {
    setDeletePop(true);
  };

  const closePop = () => {
    setDeletePop(false);
  };

  const deleteClient = () => {
    let aClient = clients.filter((obj) => obj.name !== clientToBeDeleted);

    db.collection("users").doc(user.uid).set({
      clients: aClient,
    });
  };

  const handleAdd = () => {
    setNewClient(true);
  };

  const handleClose = () => {
    setNewClient(false);
  };

  const notification = () => {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  };

  const sortAsPer = (clients, sortBy) => {
    if (sortBy === "Date") {
      return clients.sort((a, b) => {
        return (
          new Date(a.created.toDate().toLocaleDateString()) -
          new Date(b.created.toDate().toLocaleDateString())
        );
      });
    }
    if (sortBy === "Name") {
      return clients.sort((a, b) => a.name.localeCompare(b.name));
    }
    return clients;
  };

  return (
    <div className="AddCustomer">
      {user && (
        // <Link to="/addClient">
        <button className="addBox" onClick={handleAdd}>
          <Add />
        </button>
        // </Link>
      )}
      {newClient && (
        <Popup
          content={
            <NewCustomer
              notification={notification}
              handleClose={handleClose}
            />
          }
          handleClose={handleClose}
        />
      )}
      {deletePop && (
        <Popup
          confirmation="true"
          content={
            <Confirmation
              handleYes={() => {
                deleteClient();
                closePop();
              }}
              handleNo={() => {
                closePop();
              }}
              text="Do you want to delete this client ?"
            />
          }
          handleClose={closePop}
        />
      )}
      {user &&
        sortAsPer(clients, sortBy).map((scl) => (
          <SchoolTile
            name={scl.name}
            created={scl.created.toDate().toLocaleDateString()}
            openPop={openPop}
          />
        ))}
      {notify && <MessageToast content="Please fill mandatory fields" />}
    </div>
  );
}

export default AddCustomer;
