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
  const [{ user }, dispatch] = useStateValue();
  console.log(created);

  const handleSchoolPress = () => {
    window.sessionStorage.setItem("clientName", name);
    dispatch({
      type: "SET_CLIENT_NAME",
      client: name,
    });
  };

  const handleDelete = () => {
    db.collection("users")
      .doc(user.uid)
      .update({
        clients: firebase.firestore.FieldValue.arrayRemove({
          name,
          created: firebase.firestore.Timestamp.now(),
        }),
      });
    history.push("/");
  };

  return (
    <div className="SchoolTile">
      <button className="schoolBox" onClick={handleSchoolPress}>
        <p>{name}</p>
        <p>{created}</p>
        <button className="deleteButton" onClick={handleDelete}>
          <Delete />
        </button>
      </button>
    </div>
  );
}

export default SchoolTile;
