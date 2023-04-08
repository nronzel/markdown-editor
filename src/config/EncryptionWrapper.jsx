import React, { useState, createContext, useContext } from "react";

export const EncryptionPasswordContext = createContext();

export const EncryptionPasswordProvider = ({ children }) => {
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

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
        iterations: 1000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return derivedKey;
  }

  async function handleEncryptionKeyEntered(password, salt) {
    const derivedKey = await deriveKey(password, salt);
    setEncryptionKey(derivedKey);
    setIsCorrectPassword(true);
  }

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
