"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import MenuBar from "./menu-bar";

// font
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";

// alignment
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

// media
import { YoutubeResize } from "../tiptaps/youtube-resize/YoutubeResize";
import { ImageResize } from "../tiptaps/image-resize/ImageResize";

// code
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";

// code bloc lowlight
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import css from 'highlight.js/lib/languages/css'
// import js from 'highlight.js/lib/languages/javascript'
// import ts from 'highlight.js/lib/languages/typescript'
// import html from 'highlight.js/lib/languages/xml'
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled: boolean
}
export default function RichTextEditor({
  content,
  onChange,
  disabled,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      // font
      Highlight,
      Blockquote,

      // alignment
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      HorizontalRule,

      // media
      YoutubeResize.configure({
        controls: false,
        nocookie: true,
      }),
      ImageResize,

      // code
      Code,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
      }),
      Link.configure({
        HTMLAttributes: {
          class: "hyperlink",
        },
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] max-h-[500px] overflow-y-auto border rounded-md bg-slate-50 py-2 px-10",
        // class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} disabled={disabled} />
    </div>
  );
}
