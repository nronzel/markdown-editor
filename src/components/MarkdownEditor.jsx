import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/editor.css";
import Header from "./Header";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import DocumentDrawer from "./DocumentDrawer";
import Editor from "./Editor";
import Preview from "./Preview";
import DocumentBar from "./DocumentBar.jsx";

const MarkdownEditor = ({ currentUser, encryptionKey }) => {
  const [markdown, setMarkdown] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [documentName, setDocumentName] = useState("Untitled");
  const drawerRef = useRef(null);

  const clearStatusMessage = () => {
    setStatusMessage(null);
  };

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
      const encoder = new TextEncoder();
      const plaintext = encoder.encode(markdown);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const cipher = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        encryptionKey,
        plaintext
      );
      const encryptedText = new Uint8Array(cipher);

      const base64EncryptedText = arrayBufferToBase64(encryptedText);

      const docRef = await addDoc(collection(db, "documents"), {
        content: base64EncryptedText,
        iv: Array.from(iv)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
        createdAt: new Date(),
        uid: currentUser.uid,
      });

      console.log("Document saved with ID: ", docRef.id);
      setStatusMessage({
        type: "success",
        message: "Successfully saved document.",
      });
    } catch (err) {
      console.error("Error saving document: ", err);
      setStatusMessage({
        type: "error",
        message: "Error: Failed to save document.",
        code: err.code,
      });
    }
  };

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="editor-container">
      <Header />
      <DocumentBar
        toggleDrawer={toggleDrawer}
        saveDocument={saveDocument}
        statusMessage={statusMessage}
        clearStatusMessage={clearStatusMessage}
        documentName={documentName}
        setDocumentName={setDocumentName}
      />

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
