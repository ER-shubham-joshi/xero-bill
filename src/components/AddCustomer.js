import React from "react";

import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

import SchoolTile from "./SchoolTile";

import "./AddCustomer.css";

function AddCustomer() {
  const handleAdd = () => {
    alert("Adding...");
  };

  const schools = ["Oriental", "Aurbindo", "Royal", "Joshi"];

  return (
    <div className="AddCustomer">
      <Link to="/addClient">
        <button className="addBox" onClick={handleAdd}>
          <Add />
        </button>
      </Link>
      {schools.map((scl) => (
        <Link to="/client" className="schoolLink">
          <SchoolTile name={scl} />
        </Link>
      ))}
    </div>
  );
}

export default AddCustomer;
