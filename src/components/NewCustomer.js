import React, { useState, useEffect } from "react";
import "./NewCustomer.css";
import { Link, useHistory } from "react-router-dom";

import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import firebase from "firebase";

function NewCustomer({ notification, handleClose }) {
  const history = useHistory();
  const [name, setName] = useState("");

  let [{ user, clients }, dispatch] = useStateValue();

  const addClient = (e) => {
    e.preventDefault();

    if (name.length) {
      console.log(firebase.firestore.Timestamp.now());
      db.collection("users")
        .doc(user.uid)
        .update({
          clients: firebase.firestore.FieldValue.arrayUnion({
            name,
            created: firebase.firestore.Timestamp.now(),
          }),
        });

      handleClose();
    } else {
      notification();
    }

    // history.push("/");
  };

  return (
    <div className="NewCustomer">
      {/* <Link to="/">
        <img
          className="NewCustomer__logo"
          src="https://media1.thehungryjpeg.com/thumbs2/ori_3809182_ovmcut3mx7mngypwitwglmb2q62k2lcfrz2848s5_monogram-xb-logo-design.jpg"
        />
      </Link> */}

      <div className="NewCustomer__container">
        <h1>New Client Details</h1>

        <form>
          <h5>Client Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            onClick={addClient}
            className="NewCustomer__addButton"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCustomer;
