import React, { useContext } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import { AuthContext } from "../config/AuthProvider";
import { useEncryptionPasswordValue } from "../config/EncryptionWrapper";
import EncryptionModal from "../components/EncryptionModal.jsx";

const Editor = () => {
  const { currentUser } = useContext(AuthContext);
  const { encryptionKey, isCorrectPassword } = useEncryptionPasswordValue();

  return (
    <>
      {!isCorrectPassword && <EncryptionModal />}
      <MarkdownEditor currentUser={currentUser} encryptionKey={encryptionKey} />
    </>
  );
};

export default Editor;
