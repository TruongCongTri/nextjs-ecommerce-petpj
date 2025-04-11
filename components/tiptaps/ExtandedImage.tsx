
import Image from "@tiptap/extension-image"

export const ExtendedImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: "",
      },
      alt: {
        default: undefined,
      },
      title: {
        default: undefined,
      },
      width: {
        default: undefined,
      },
      height: {
        default: undefined,
      },
      style: {
        default: undefined,
      },
    };
  },
});

// type ImageAttributes = {
//   src: string;
//   alt?: string;
//   title?: string;
//   width?: string | undefined;
//   height?: string | undefined;
//   style?: string;
// };


// export const addImage = () => {
//   const url = window.prompt("URL");
//   const width = window.prompt("Width");
//   const height = window.prompt("Height");
//   const position = window.prompt("Position (left, right, center)");

//   if (url && editor) {
//     const imageAttributes: ImageAttributes = {
//       src: url,
//       alt: "",
//       title: "",
//       width: width || undefined,
//       height: height || undefined,
//       style: `float: ${position || "none"}`,
//     };
//     editor.chain().focus().setImage(imageAttributes).run();
//   }
// };
