import React from "react";
import "../styles/documentdrawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const DocumentDrawer = React.forwardRef(({ toggleDrawer }, ref) => {
  return (
    <div className="main-container" ref={ref}>
      <div className="drawer-heading">
        <h2 style={{color: "#08dbaa"}}>Documents</h2>
        <FontAwesomeIcon
          className="close-btn"
          icon={faSquareMinus}
          onClick={toggleDrawer}
        />
      </div>
    </div>
  );
});

export default DocumentDrawer;
