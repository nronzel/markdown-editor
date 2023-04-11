import React, { useState, useEffect } from "react";
import "../styles/documentdrawer.css";
import { db } from "../config/firebase.js";
import { doc as docRef, deleteDoc } from "firebase/firestore";
import { decryptDocuments } from "../utils/documentActions";

const DocumentDrawer = React.forwardRef(
  (
    {
      toggleDrawer,
      userDocuments,
      encryptionKey,
      openDocument,
      handleNewDocument,
      openedDocumentId,
      setOpenedDocumentId,
      deleteUserDocument,
    },
    ref
  ) => {
    const [decryptedDocuments, setDecryptedDocuments] = useState([]);
    const [deletingDocId, setDeletingDocId] = useState(null);

    const handleDocumentClick = (id, content, name) => {
      openDocument(id, content, name);
      setOpenedDocumentId(id);
      toggleDrawer();
    };

    const deleteDocument = async (docId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this document?"
      );

      if (confirmDelete) {
        setDeletingDocId(docId);
        if (docId === openedDocumentId) {
          await handleNewDocument();
        }

        const documentRef = docRef(db, "documents", docId);
        await deleteDoc(documentRef);

        setDecryptedDocuments((prevDecryptedDocuments) =>
          prevDecryptedDocuments.filter((d) => d.id !== docId)
        );

        setDeletingDocId(null);
        deleteUserDocument(docId);
      }
    };

    useEffect(() => {
      async function handleDecryptDocuments() {
        if (userDocuments.length > 0 && encryptionKey) {
          const decryptedDocs = await decryptDocuments(
            userDocuments,
            encryptionKey
          );
          setDecryptedDocuments(decryptedDocs);
        }
      }
      handleDecryptDocuments();
    }, [userDocuments, encryptionKey]);

    return (
      <div className="main-container" ref={ref}>
        <div className="drawer-header">
          <h3>Saved Documents</h3>
        </div>
        <div className="doc-list">
          <ul>
            {decryptedDocuments.map((doc) => (
              <li
                key={doc.id}
                className={doc.id === openedDocumentId ? "active" : ""}
              >
                <button
                  className="del-btn"
                  onClick={() => deleteDocument(doc.id)}
                >
                  {deletingDocId === doc.id ? (
                    <span className="spinner"></span>
                  ) : (
                    "X"
                  )}
                </button>
                <span
                  className="doc-name"
                  onClick={() =>
                    handleDocumentClick(doc.id, doc.content, doc.name)
                  }
                >
                  {doc.name || "Untitled"}
                </span>
              </li>
            ))}
          </ul>
          <button className="close-btn" onClick={toggleDrawer}>
            Close
          </button>
        </div>
      </div>
    );
  }
);

export default DocumentDrawer;
