import React from "react";
import "../styles/editor.css"

const Editor = ({ markdown, handleTabKey, setMarkdown }) => {
  return (
    <div className="container">
      <h2 className="titles">Editor</h2>
      <textarea
        onKeyDown={handleTabKey}
        className="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
};

export default Editor;
