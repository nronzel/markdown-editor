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
    <div className="form-container">
      <div className="field">
        <label>{label}</label>
        <input
          type={fieldType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="profile-btn" type="button" onClick={handleSubmit}>
          Save
        </button>
        <button className="regular-btn" onClick={() => setIsEditing(false)}>
          Back
        </button>
      </div>
    </div>
  ) : (
    <div className="field-container">
      <p className="field-name">{label}:</p>
      <p> {initialValue} </p>
      <button className="profile-btn" onClick={() => setIsEditing(true)}>
        Update
      </button>
    </div>
  );
};

export default FieldUpdater;
