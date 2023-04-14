import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/editor.css";
import Header from "./Header";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import DocumentDrawer from "./DocumentDrawer";
import Editor from "./Editor";
import Preview from "./Preview";
import DocumentBar from "./DocumentBar.jsx";
import {
  saveDocument,
  updateUserDocuments,
  deleteUserDocument,
  openDocument,
} from "../utils/documentActions";

const MarkdownEditor = ({ currentUser, encryptionKey }) => {
  const [markdown, setMarkdown] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [documentName, setDocumentName] = useState("Untitled");
  const [userDocuments, setUserDocuments] = useState([]);
  const [openedDocumentId, setOpenedDocumentId] = useState(null);
  const drawerRef = useRef(null);

  const handleUpdateUserDocuments = (newDocument) => {
    setUserDocuments(updateUserDocuments(userDocuments, newDocument));
  };

  const handleDeleteUserDocument = (docId) => {
    setUserDocuments(deleteUserDocument(userDocuments, docId));
  };

  const handleOpenDocument = (id, content, name) => {
    const { openedDocumentId, markdown, documentName } = openDocument(
      id,
      content,
      name
    );
    setOpenedDocumentId(openedDocumentId);
    setMarkdown(markdown);
    setDocumentName(documentName);
  };

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

  const handleSaveDocument = async () => {
    await saveDocument(
      currentUser,
      markdown,
      openedDocumentId,
      documentName,
      setUserDocuments,
      setStatusMessage,
      fetchUserDocuments,
      encryptionKey,
      setOpenedDocumentId
    );
  };

  const fetchUserDocuments = async () => {
    if (!currentUser) return;

    const docRef = collection(db, "documents");
    const userQuery = query(docRef, where("uid", "==", currentUser.uid));
    const docsSnapshot = await getDocs(userQuery);

    setUserDocuments(
      docsSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
  };

  useEffect(() => {
    fetchUserDocuments();
  }, [currentUser]);

  const handleNewDocument = () => {
    setOpenedDocumentId(null);
    setMarkdown("");
    setDocumentName("Untitled");
  };

  return (
    <div className="editor-container">
      <Header />
      <DocumentBar
        toggleDrawer={toggleDrawer}
        saveDocument={handleSaveDocument}
        statusMessage={statusMessage}
        clearStatusMessage={clearStatusMessage}
        documentName={documentName}
        setDocumentName={setDocumentName}
        handleNewDocument={handleNewDocument}
        currentUser={currentUser}
      />

      {showDrawer && (
        <DocumentDrawer
          toggleDrawer={toggleDrawer}
          ref={drawerRef}
          userDocuments={userDocuments}
          encryptionKey={encryptionKey}
          updateUserDocuments={handleUpdateUserDocuments}
          openDocument={handleOpenDocument}
          handleNewDocument={handleNewDocument}
          setOpenedDocumentId={setOpenedDocumentId}
          openedDocumentId={openedDocumentId}
          deleteUserDocument={handleDeleteUserDocument}
        />
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
