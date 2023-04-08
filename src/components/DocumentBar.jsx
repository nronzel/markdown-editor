import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFileCirclePlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
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
  handleNewDocument,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const documentNameInput = useRef(null);

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  useEffect(() => {
    if (documentNameInput.current) {
      documentNameInput.current.value = documentName;
    }
  }, [documentName]);

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
            ref={documentNameInput}
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
      <div className="right-bar">
        <button onClick={handleNewDocument} className="new-doc-btn">
          <FontAwesomeIcon
            className="new-doc"
            icon={faFileCirclePlus}
          />
        </button>
      </div>
    </div>
  );
};

export default DocumentBar;
