"use client";

import { useLayoutEffect, useState } from "react";
import { highlight } from "./utils/hightlight";

interface SyntaxHighlighterProps {
  content?: string;
  language?: string;
}

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nodes, setNodes] = useState<any>(null);

  useLayoutEffect(() => {
    highlight(props.content!, props.language!).then(setNodes);
  }, []);

  if (!nodes) return <code {...props}>{props.content}</code>;

  return nodes;
};

export default SyntaxHighlighter;
