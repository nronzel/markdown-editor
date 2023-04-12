import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faFileCirclePlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import SaveButton from "./SaveButton.jsx";
import StatusMessage from "./StatusMessage.jsx";
import "../styles/documentbar.css";
import { NavLink } from "react-router-dom";

const DocumentBar = ({
  toggleDrawer,
  saveDocument,
  statusMessage,
  clearStatusMessage,
  documentName,
  setDocumentName,
  handleNewDocument,
  currentUser,
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
        {currentUser && currentUser.isAnonymous ? (
          <NavLink to="/signup">
            <span className="link">Sign up to save documents</span>
          </NavLink>
        ) : (
          <SaveButton saveDocument={saveDocument} />
        )}
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
          <>
            <input
              type="text"
              ref={documentNameInput}
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              onBlur={toggleEditMode}
              className="edit-name"
            />
            <FontAwesomeIcon
              icon={faCheck}
              onClick={toggleEditMode}
              className="accept-btn"
            />
          </>
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
          <FontAwesomeIcon className="new-doc" icon={faFileCirclePlus} />
        </button>
      </div>
    </div>
  );
};

export default DocumentBar;
