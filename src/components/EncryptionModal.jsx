import React, { useContext, useState } from "react";
import { EncryptionPasswordContext } from "../config/EncryptionWrapper.jsx";
import "../styles/encryptionmodal.css";
import { signOut } from "firebase/auth";

const MAX_ATTEMPTS = 6;

const EncryptionModal = () => {
  const [encryptionPassword, setEncryptionPassword] = useState("");
  const [numAttempts, setNumAttempts] = useState(0);
  const { handleEncryptionKeyEntered } = useContext(EncryptionPasswordContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numAttempts >= MAX_ATTEMPTS) {
      signOut();
    } else {
      handleEncryptionKeyEntered(encryptionPassword);
      setNumAttempts(numAttempts + 1);
    }
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal">
          <p>Please enter your encryption password</p>
          <input
            onChange={(e) => setEncryptionPassword(e.target.value)}
            value={encryptionPassword}
            type="password"
            required
          />
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default EncryptionModal;
