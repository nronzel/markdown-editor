import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const SaveButton = ({ saveDocument }) => {
  return (
    <button className="save-btn" onClick={saveDocument}>
      <FontAwesomeIcon icon={faFloppyDisk} />
    </button>
  );
};

export default SaveButton;
