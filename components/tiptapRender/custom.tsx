/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
import dynamic from "next/dynamic";
import Image from "next/image";
import { Components } from "rehype-react";

import type { ReactElement } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";
import CopyButton from "./CopyButton";


const SyntaxHighlighter = dynamic(() => import("./SyntaxHighlighter"), {
  ssr: true,
});

export const components: Partial<Components> = {
  h2: (props) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props) => <HeadingWithAnchor level={4} {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  img: ({ src, alt, title, width, height, ...props }: any) => (
    <figure className="my-4">
      <Image
        src={src}
        alt={alt || ""}
        width={width}
        height={100}
        className="mx-auto rounded-lg"
      />
      <figcaption>{title}</figcaption>
    </figure>
  ),
  iframe: ({ ...props }) => (
    <div className="my-4">
      <iframe
        {...props}
        autoPlay={false}
        loop={false}
        allowFullScreen={true}
        // className="w-full h-full mx-auto aspect-video rounded-lg"
        className="mx-auto aspect-video rounded-lg"
      />
    </div>
  ),
  pre: ({ children, ...props }) => {
    const code = (children as ReactElement<any>).props?.children;
    return (
      // <div className="relative group not-prose rounded-lg overflow-hidden border border-[#d1d9e0] dark:border-[#3d444d]">
      <div className="code relative group not-prose">
        <CopyButton code={String(code)} />
        <pre className=" overflow-y-auto" {...(props as any)}>{children}</pre>
      </div>
    );
  },
  code: ({ children, ...props }) => {
    const match = /language-(\w+)/.exec(props.className || "");
    const code = String(children).replace(/\n$/, "");
    return match ? (
      <SyntaxHighlighter language={match[1]} content={code} />
    ) : (
      <code {...props}>{children}</code>
    );
  },
  table: (props: any) => (
    <table
      className="not-prose w-full table-auto border-collapse mx-auto text-sm"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr
      className="border-b last:border-b-0 border-b-[#d1d9e0] dark:border-b-[#3d444d]"
      {...props}
    />
  ),
  td: (props: any) => <td className="px-2.5 py-3.5" {...props} />,
  th: (props: any) => <td className="px-2.5 py-3.5 font-bold" {...props} />,
};
