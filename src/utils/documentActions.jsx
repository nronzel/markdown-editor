import {
  collection,
  addDoc,
  updateDoc,
  doc as docRef,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const saveDocument = async (
  currentUser,
  markdown,
  openedDocumentId,
  documentName,
  setUserDocuments,
  setStatusMessage,
  fetchUserDocuments,
  encryptionKey,
  setOpenedDocumentId
) => {
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

    if (openedDocumentId) {
      // Update the existing document
      const documentRef = docRef(db, "documents", openedDocumentId);
      await updateDoc(documentRef, {
        content: base64EncryptedText,
        iv: Array.from(iv)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
        updatedAt: new Date(),
        name: documentName,
        uid: currentUser.uid,
      });

      console.log("Document updated with ID: ", openedDocumentId);
      setStatusMessage({
        type: "success",
        message: "Successfully updated document.",
      });

      // Update the userDocuments state
      setUserDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === openedDocumentId
            ? {
                ...doc,
                data: {
                  ...doc.data,
                  content: base64EncryptedText,
                  updatedAt: new Date(),
                  name: documentName,
                },
              }
            : doc
        )
      );
    } else {
      // Create a new document
      const docRef = await addDoc(collection(db, "documents"), {
        content: base64EncryptedText,
        iv: Array.from(iv)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
        createdAt: new Date(),
        uid: currentUser.uid,
        name: documentName,
      });

      console.log("Document saved with ID: ", docRef.id);
      setStatusMessage({
        type: "success",
        message: "Successfully saved document.",
      });

      setUserDocuments((prevDocuments) => [
        ...prevDocuments,
        {
          id: docRef.id,
          data: {
            content: base64EncryptedText,
            createdAt: new Date(),
            uid: currentUser.uid,
            name: documentName,
          },
        },
      ]);
      setOpenedDocumentId(docRef.id);
    }
  } catch (err) {
    console.error("Error saving document: ", err);
    setStatusMessage({
      type: "error",
      message: "Error: Failed to save document.",
      code: err.code,
    });
  }
  fetchUserDocuments();
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
