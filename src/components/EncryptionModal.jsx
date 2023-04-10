import React, { useContext, useState, useEffect } from "react";
import { EncryptionPasswordContext } from "../config/EncryptionWrapper.jsx";
import "../styles/encryptionmodal.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const MAX_ATTEMPTS = 6;

const EncryptionModal = () => {
  const [encryptionPassword, setEncryptionPassword] = useState("");
  const [numAttempts, setNumAttempts] = useState(0);
  const [userSalt, setUserSalt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleEncryptionKeyEntered, isCorrectPassword } = useContext(
    EncryptionPasswordContext
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserSalt(user.uid);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserSalt = async (uid) => {
    try {
      const userDocRef = doc(db, "userSalts", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserSalt(userDocSnap.data().salt);
      } else {
        const newSalt = generateRandomSalt();
        await setDoc(userDocRef, { salt: newSalt });
        setUserSalt(newSalt);
      }
    } catch (error) {
      console.error("Error fetching user salt:", error);
    }
  };

  const generateRandomSalt = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPasswordCorrect = await handleEncryptionKeyEntered(
      encryptionPassword,
      userSalt
    );

    if (!isPasswordCorrect) {
      setNumAttempts(numAttempts + 1);
      setErrorMessage("Incorrect password. Please try again.");
    } else {
      setNumAttempts(0);
      setErrorMessage("");
    }

    if (numAttempts + 1 >= MAX_ATTEMPTS) {
      signOut(auth);
    }
  };

  return (
    <>
      {!isCorrectPassword && (
        <div className="modal-container">
          <div className="modal">
            <p>Please enter your encryption password</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              onChange={(e) => setEncryptionPassword(e.target.value)}
              value={encryptionPassword}
              type="password"
              required
            />
            <button className="btn" onClick={handleSubmit} disabled={!userSalt}>
              Submit
            </button>
            <p className="small">
              Do not forget your encryption password! There is no way to recover
              it if it is forgotten!
            </p>
          </div>
        </div>
      )}
      {!isCorrectPassword && <div className="overlay"></div>}
    </>
  );
};
export default EncryptionModal;
