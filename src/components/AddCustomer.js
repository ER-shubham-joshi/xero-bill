import React, { useState } from "react";

import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

import SchoolTile from "./SchoolTile";

import NewCustomer from "./NewCustomer";

import MessageToast from "./MessageToast";

import Popup from "./Popup";

import "./AddCustomer.css";

import { useStateValue } from "../StateProvider";

function AddCustomer() {
  const [{ clients, user, sortBy }, dispatch] = useStateValue();

  const [newClient, setNewClient] = useState(false);

  let [notify, setNotify] = useState(false);

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
    }, 3000);
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
      {user &&
        sortAsPer(clients, sortBy).map((scl) => (
          // <Link to="/client" className="schoolLink">
          <SchoolTile
            name={scl.name}
            created={scl.created.toDate().toLocaleDateString()}
          />
          // </Link>
        ))}
      {notify && <MessageToast content="Please fill mandatory fields" />}
    </div>
  );
}

export default AddCustomer;
