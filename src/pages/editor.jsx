import React, { useContext } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import { AuthContext } from "../config/AuthProvider";
import { useEncryptionPasswordValue } from "../config/EncryptionWrapper";
import EncryptionModal from "../components/EncryptionModal.jsx";

const Editor = () => {
  const { currentUser } = useContext(AuthContext);
  const { encryptionPassword } = useEncryptionPasswordValue();

  return (
    <>
      {!encryptionPassword && <EncryptionModal />}
      <MarkdownEditor
        currentUser={currentUser}
        encryptionPassword={encryptionPassword}
      />
    </>
  );
};

export default Editor;
