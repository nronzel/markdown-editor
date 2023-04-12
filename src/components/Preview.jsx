import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/editor.css";

const Preview = ({ markdown }) => {
  const [textWrap, setTextWrap] = useState(false);

  const handleTextWrap = (e) => {
    setTextWrap(e.target.checked);
  };

  return (
    <div className="container">
      <div className="preview-head">
        <h2 className="titles">Preview</h2>
        <div className="flex">
          <input
            className="wrap-text"
            type="checkbox"
            value="textWrap"
            onChange={handleTextWrap}
          />{" "}
          <p className="small-txt">Wrap Text?</p>
        </div>
      </div>
      <ReactMarkdown
        children={markdown}
        className="preview"
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={coldarkDark}
                showLineNumbers="true"
                wrapLongLines={textWrap}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Preview;
