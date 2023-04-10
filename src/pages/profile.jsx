import React, { useState } from "react";
import Header from "../components/Header";
import { useAuthValue } from "../config/AuthProvider";
import {
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import "../styles/profile.css";
import FieldUpdater from "../components/FieldUpdater";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Profile = () => {
  const { currentUser } = useAuthValue();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailUpdate = async (newEmail) => {
    await updateEmail(currentUser, newEmail);
  };

  const handlePasswordUpdate = async (newPassword) => {
    await updatePassword(currentUser, newPassword);
  };

  const handleAccountDeletion = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(currentUser);
        await auth.signOut();
        navigate("/");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        height: "90dvh",
      }}
    >
      <Header />
      <h2>Profile</h2>
      <FieldUpdater
        label="Email"
        fieldType="email"
        initialValue={currentUser.email}
        onUpdate={handleEmailUpdate}
        isEditing={isEditingEmail}
        setIsEditing={setIsEditingEmail}
      />
      <FieldUpdater
        label="Password"
        fieldType="password"
        onUpdate={handlePasswordUpdate}
        isEditing={isEditingPassword}
        setIsEditing={setIsEditingPassword}
      />
      <button className="delete-account-btn" onClick={handleAccountDeletion}>
        Delete account
      </button>
    </div>
  );
};

export default Profile;
