import React, { useState } from "react";
import "../styles/profile.css";

const FieldUpdater = ({
  label,
  fieldType,
  initialValue,
  onUpdate,
  isEditing,
  setIsEditing,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(value);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return isEditing ? (
    <form onSubmit={handleSubmit} className="field">
      <div className="field">
        <label>{label}</label>
        <input
          type={fieldType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="profile-btn" type="submit">
          Save
        </button>
      </div>
      <button className="regular-btn" onClick={() => setIsEditing(false)}>
        Go Back
      </button>
    </form>
  ) : (
      <div className="field-container">
        <p>{label}:</p>
        <p> {initialValue} </p>
        <button className="profile-btn" onClick={() => setIsEditing(true)}>
          Change
        </button>
      </div>
  );
};

export default FieldUpdater;
