import React, { useEffect } from "react";
import "../styles/statusmessage.css"

const StatusMessage = ({ statusMessage, clearStatusMessage }) => {
  const { type, message } = statusMessage;
  const messageClass = type === "success" ? "success-message" : "error-message";

  useEffect(() => {
    const timer = setTimeout(() => {
      clearStatusMessage();
    }, 2500);

    return () => clearTimeout(timer);
  }, [statusMessage, clearStatusMessage]);

  return <div className={`${messageClass} status-message`}>{message}</div>;
};

export default StatusMessage;
