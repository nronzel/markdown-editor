import React, { useState, createContext, useContext, useEffect } from "react";
import { encryptMarkdown, base64ToArrayBuffer } from "../utils/documentActions";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export const EncryptionPasswordContext = createContext();

export const EncryptionPasswordProvider = ({ children }) => {
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setEncryptionKey(null);
        setIsCorrectPassword(false);
      }
    });
    return unsubscribe;
  }, []);

  async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = new Uint8Array(
      salt.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    const subtle = window.crypto.subtle;
    const key = await subtle.importKey("raw", passwordBuffer, "PBKDF2", false, [
      "deriveKey",
    ]);
    const derivedKey = await subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltBuffer,
        iterations: 50000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return derivedKey;
  }

  const handleEncryptionKeyEntered = async (password, salt) => {
    const derivedKey = await deriveKey(password, salt);
    setEncryptionKey(derivedKey);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const isDecryptionSuccessful = await fetchTestDocument(
        currentUser.uid,
        derivedKey
      );
      setIsCorrectPassword(isDecryptionSuccessful);
      return isDecryptionSuccessful;
    }
    return false;
  };

  const createTestDocument = async (uid, encryptionKey) => {
    try {
      const { base64EncryptedText, iv } = await encryptMarkdown(
        "test-data",
        encryptionKey
      );
      const testDocRef = doc(
        db,
        "users",
        uid,
        "testDocuments",
        "test-document"
      );
      await setDoc(testDocRef, {
        base64EncryptedText,
        iv: Array.from(iv)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
        uid: uid,
      });
    } catch (error) {
      console.error("Error creating test document:", error);
    }
  };

  async function decryptTestDocument(docData, encryptionKey) {
    try {
      const encryptedText = base64ToArrayBuffer(docData.base64EncryptedText);
      const iv = new Uint8Array(
        docData.iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const decryptedContent = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        encryptionKey,
        encryptedText
      );
      const decoder = new TextDecoder();
      const plaintext = decoder.decode(decryptedContent);
      return plaintext === "test-data";
    } catch (error) {
      console.error("Error decrypting test data:", error);
      return false;
    }
  }

  const fetchTestDocument = async (uid, encryptionKey) => {
    try {
      const testDocRef = doc(
        db,
        "users",
        uid,
        "testDocuments",
        "test-document"
      );
      const testDocSnap = await getDoc(testDocRef);
      if (testDocSnap.exists()) {
        const isDecryptionSuccessful = await decryptTestDocument(
          testDocSnap.data(),
          encryptionKey
        );
        setIsCorrectPassword(isDecryptionSuccessful);
        return isDecryptionSuccessful;
      } else {
        await createTestDocument(uid, encryptionKey);
        setIsCorrectPassword(true);
        return true;
      }
    } catch (error) {
      console.error("Error fetching/creating test document:", error);
      return false;
    }
  };

  return (
    <EncryptionPasswordContext.Provider
      value={{
        encryptionKey,
        handleEncryptionKeyEntered,
        isCorrectPassword,
        setIsCorrectPassword,
      }}
    >
      {children}
    </EncryptionPasswordContext.Provider>
  );
};

export const useEncryptionPasswordValue = () =>
  useContext(EncryptionPasswordContext);
