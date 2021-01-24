import React from "react";
import "./SchoolTile.css";

import Button from "./Button";
import { Delete } from "@material-ui/icons";

import { useStateValue } from "../StateProvider";

import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import firebase from "firebase";

function SchoolTile({ name, created }) {
  const history = useHistory();
  const [{ user, clients }, dispatch] = useStateValue();

  const handleSchoolPress = () => {
    console.log("tile pressed");
    window.sessionStorage.setItem("clientName", name);
    dispatch({
      type: "SET_CLIENT_NAME",
      client: name,
    });
    history.push("/client");
  };

  const handleDelete = () => {
    let aClient = clients.filter((obj) => obj.name !== name);

    console.log("delete pressed");

    db.collection("users").doc(user.uid).set({
      clients: aClient,
    });

    // history.push("/");
  };

  return (
    <div className="SchoolTile">
      <button className="deleteButton" onClick={handleDelete}>
        <Delete />
      </button>
      <button className="schoolBox" onClick={handleSchoolPress}>
        <p>{name}</p>
        <p>{created}</p>
      </button>
    </div>
  );
}

export default SchoolTile;
