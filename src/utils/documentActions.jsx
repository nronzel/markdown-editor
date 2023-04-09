import {
  collection,
  addDoc,
  updateDoc,
  doc as docRef,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const encryptMarkdown = async (markdown, encryptionKey) => {
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
  return { base64EncryptedText, iv };
};

export async function decryptDocuments(userDocuments, encryptionKey) {
  const decryptedDocs = [];
  for (const doc of userDocuments) {
    try {
      const encryptedText = base64ToArrayBuffer(doc.data.content);
      const iv = new Uint8Array(
        doc.data.iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
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
      console.error(error.message, error.code);
    }
  }
  return decryptedDocs;
}

const updateExistingDocument = async (
  openedDocumentId,
  base64EncryptedText,
  iv,
  documentName,
  currentUser,
  setStatusMessage,
  setUserDocuments
) => {
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
  setStatusMessage({
    type: "success",
    message: "Successfully updated document.",
  });

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
};

const createNewDocument = async (
  base64EncryptedText,
  iv,
  currentUser,
  documentName,
  setStatusMessage,
  setUserDocuments,
  setOpenedDocumentId
) => {
  const docRef = await addDoc(collection(db, "documents"), {
    content: base64EncryptedText,
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    createdAt: new Date(),
    uid: currentUser.uid,
    name: documentName,
  });
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
};

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
    const { base64EncryptedText, iv } = await encryptMarkdown(
      markdown,
      encryptionKey
    );

    if (openedDocumentId) {
      await updateExistingDocument(
        openedDocumentId,
        base64EncryptedText,
        iv,
        documentName,
        currentUser,
        setStatusMessage,
        setUserDocuments
      );
    } else {
      await createNewDocument(
        base64EncryptedText,
        iv,
        currentUser,
        documentName,
        setStatusMessage,
        setUserDocuments,
        setOpenedDocumentId
      );
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

export function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  const sanitizedBase64 = base64
    .replace(/[\s\r\n]+$/, "")
    .replace(/[^A-Za-z0-9+/]/g, "");
  const binaryString = window.atob(sanitizedBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
