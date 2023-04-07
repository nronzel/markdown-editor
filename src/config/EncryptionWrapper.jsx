import React, { useState, createContext, useContext } from "react";
import CryptoJS from "crypto-js";

export const EncryptionPasswordContext = createContext();

export const EncryptionPasswordProvider = ({ children }) => {
  const [encryptionPassword, setEncryptionPassword] = useState(null);

  function hashPassword(password) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    }).toString();
    return key;
  }

  function handleEncryptionKeyEntered(password) {
    const hashedPassword = hashPassword(password);
    setEncryptionPassword(hashedPassword);
    console.log(hashedPassword);
  }

  return (
    <EncryptionPasswordContext.Provider
      value={{ encryptionPassword, handleEncryptionKeyEntered }}
    >
      {children}
    </EncryptionPasswordContext.Provider>
  );
};

export const useEncryptionPasswordValue = () =>
  useContext(EncryptionPasswordContext);
