import React, { useState, useEffect } from "react";
import "./NewCustomer.css";
import { Link, useHistory } from "react-router-dom";

import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function NewCustomer() {
  const history = useHistory();
  const [name, setName] = useState("");

  let [{ user, clients }, dispatch] = useStateValue();

  const addClient = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_CLIENT",
      clients: name,
    });
    console.log(clients);
    db.collection("users")
      .doc(user.uid)
      .set(
        {
          clients: [...clients, name],
        },
        { merge: true }
      );
    history.push("/");
  };

  return (
    <div className="NewCustomer">
      <Link to="/">
        <img
          className="NewCustomer__logo"
          src="https://media1.thehungryjpeg.com/thumbs2/ori_3809182_ovmcut3mx7mngypwitwglmb2q62k2lcfrz2848s5_monogram-xb-logo-design.jpg"
        />
      </Link>

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
