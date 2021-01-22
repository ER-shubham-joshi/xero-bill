import React from "react";

import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

import SchoolTile from "./SchoolTile";

import "./AddCustomer.css";

import { useStateValue } from "../StateProvider";

function AddCustomer() {
  const [{ clients, user }, dispatch] = useStateValue();

  const handleAdd = () => {
    // alert("Adding...");
  };
  return (
    <div className="AddCustomer">
      {user && (
        <Link to="/addClient">
          <button className="addBox" onClick={handleAdd}>
            <Add />
          </button>
        </Link>
      )}
      {clients.map((scl) => (
        <Link to="/client" className="schoolLink">
          <SchoolTile name={scl} />
        </Link>
      ))}
    </div>
  );
}

export default AddCustomer;
