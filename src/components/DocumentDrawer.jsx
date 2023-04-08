import React, { useState, useEffect } from "react";
import "../styles/documentdrawer.css";
import { db } from "../config/firebase.js";
import { doc as docRef, deleteDoc } from "firebase/firestore";

const DocumentDrawer = React.forwardRef(
  (
    {
      toggleDrawer,
      userDocuments,
      encryptionKey,
      openDocument,
      handleNewDocument,
      openedDocumentId,
      deleteUserDocument,
    },
    ref
  ) => {
    const [decryptedDocuments, setDecryptedDocuments] = useState([]);
    const [deletingDocId, setDeletingDocId] = useState(null);

    const handleDocumentClick = (content, name, id) => {
      openDocument(content, name, id);
      toggleDrawer();
    };

    const deleteDocument = async (docId) => {
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
    };

    useEffect(() => {
      async function decryptDocuments() {
        const decryptedDocs = [];
        for (const doc of userDocuments) {
          try {
            const encryptedText = base64ToArrayBuffer(doc.data.content); // Change from doc.data.content
            const iv = new Uint8Array(
              doc.data.iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)) // Change from doc.data.iv
            );
            const decryptedContent = await crypto.subtle.decrypt(
              { name: "AES-GCM", iv },
              encryptionKey,
              encryptedText
            );
            const decoder = new TextDecoder();
            const plaintext = decoder.decode(decryptedContent);
            decryptedDocs.push({
              id: doc.id,
              content: plaintext,
              name: doc.data.name,
            });
          } catch (error) {
            alert("Error decrypting document with ID:", doc.id, error);
          }
        }
        setDecryptedDocuments(decryptedDocs);
      }
      if (userDocuments.length > 0 && encryptionKey) {
        decryptDocuments();
      }
    }, [userDocuments, encryptionKey]);

    function base64ToArrayBuffer(base64) {
      // Sanitize the base64 string
      const sanitizedBase64 = base64
        .replace(/[\s\r\n]+$/, "")
        .replace(/[^A-Za-z0-9+/]/g, "");

      // Use the sanitized base64 string
      const binaryString = window.atob(sanitizedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    return (
      <div className="main-container" ref={ref}>
        <div className="drawer-header">
          <h3>Saved Documents</h3>
        </div>
        <div className="doc-list">
          <ul>
            {decryptedDocuments.map((doc) => (
              <li key={doc.id}>
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
          <button onClick={toggleDrawer}>Close</button>
        </div>
      </div>
    );
  }
);

export default DocumentDrawer;
