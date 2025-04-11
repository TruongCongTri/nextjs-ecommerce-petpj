// YoutubeResize.tsx

import { Youtube } from "@tiptap/extension-youtube";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ResizableYoutubeTemplate } from "./ResizableYoutubeTemplate";

export const YoutubeResize = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: this.options.width,
        renderHTML: ({ width }) => ({ width }),
      },
      height: {
        default: "auto",
        renderHTML: ({ height }) => ({ height }),
      },
      align: {
        default: "mx-auto",
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableYoutubeTemplate);
  },
}).configure({
  modestBranding: true,
  ivLoadPolicy: 3,
});
