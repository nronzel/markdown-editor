import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SaveButton from "./SaveButton.jsx";
import StatusMessage from "./StatusMessage.jsx";
import "../styles/documentbar.css";

const DocumentBar = ({
  toggleDrawer,
  saveDocument,
  statusMessage,
  clearStatusMessage,
  documentName,
  setDocumentName,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div className="drawer-btn-container">
      <div className="left-bar">
        <FontAwesomeIcon
          icon={faBars}
          className="drawer-icon"
          onClick={toggleDrawer}
        />
        <SaveButton saveDocument={saveDocument} />
        <div>
          {statusMessage && (
            <StatusMessage
              statusMessage={statusMessage}
              clearStatusMessage={clearStatusMessage}
            />
          )}
        </div>
      </div>
      <div className="middle-bar">
        {isEditing ? (
          <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            onBlur={toggleEditMode}
          />
        ) : (
          <>
            {documentName}{" "}
            <FontAwesomeIcon
              className="edit-btn"
              icon={faPenToSquare}
              onClick={toggleEditMode}
            />
          </>
        )}
      </div>
      <div className="right-bar"></div>
    </div>
  );
};

export default DocumentBar;
