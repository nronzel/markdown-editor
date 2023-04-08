import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const btnStyle = {
    width: "3rem",
    padding: "0",
    flexShrink: "0",
}

const SaveButton = ({ saveDocument }) => {
  return (
    <button style={btnStyle} onClick={saveDocument}>
      <FontAwesomeIcon icon={faFloppyDisk} />
    </button>
  );
};

export default SaveButton;
