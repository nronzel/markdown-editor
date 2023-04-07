import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/editor.css";
import Header from "./Header";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import DocumentDrawer from "./DocumentDrawer";
import Editor from "./Editor";
import Preview from "./Preview";
import SaveButton from "./SaveButton";

const MarkdownEditor = ({ currentUser, encryptionPassword }) => {
  const [markdown, setMarkdown] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setShowDrawer((prevShowDrawer) => !prevShowDrawer);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (
        showDrawer &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        toggleDrawer();
      }
    },
    [showDrawer, toggleDrawer]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value =
        textarea.value.substring(0, start) +
        "\t" +
        textarea.value.substring(end);

      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
  };

  const saveDocument = async () => {
    if (!currentUser) {
      alert("You must be signed in to save a document.");
      return;
    }

    try {
      const key = encryptionPassword;
      const encryptedText = CryptoJS.AES.encrypt(markdown, key).toString();

      const docRef = await addDoc(collection(db, "documents"), {
        content: encryptedText,
        createdAt: new Date(),
        uid: currentUser.uid,
      });
      console.log("Document saved with ID: ", docRef.id);
      alert("Document saved successfully.");
    } catch (err) {
      console.error("Error saving document: ", err);
      alert("Failed to saved document.", err.message);
    }
  };

  return (
    <div className="editor-container">
      <Header />
      <div className="drawer-btn-container">
        <FontAwesomeIcon
          icon={faBars}
          className="drawer-icon"
          onClick={toggleDrawer}
        />
        <SaveButton saveDocument={saveDocument} />
      </div>
      {showDrawer && (
        <DocumentDrawer toggleDrawer={toggleDrawer} ref={drawerRef} />
      )}
      <div className="main-section">
        <Editor
          markdown={markdown}
          handleTabKey={handleTabKey}
          setMarkdown={setMarkdown}
        />
        <Preview markdown={markdown} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
