import React from "react";
import "./SchoolTile.css";

function SchoolTile({ name }) {
  const handleSchoolPress = () => {
    alert("Welcome to " + name);
  };

  return (
    <div className="SchoolTile">
      <button className="schoolBox" onClick={handleSchoolPress}>
        {name}
      </button>
    </div>
  );
}

export default SchoolTile;
