import React from "react";
import "./SchoolTile.css";

import { useStateValue } from "../StateProvider";

function SchoolTile({ name }) {
  const [, dispatch] = useStateValue();

  const handleSchoolPress = () => {
    window.sessionStorage.setItem("clientName", name);
    dispatch({
      type: "SET_CLIENT_NAME",
      client: name,
    });
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
