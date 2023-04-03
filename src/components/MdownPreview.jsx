import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const MdownPreview = ({ markdown }) => {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default MdownPreview;
