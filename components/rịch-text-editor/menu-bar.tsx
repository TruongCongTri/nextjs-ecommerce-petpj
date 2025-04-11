import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Quote,
  SquareCode,
  Strikethrough,
  Video,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter Image URL");
    const alt = window.prompt("Enter Image Alt");
    const title = window.prompt("Enter Image Tittle");
    if (url && alt && title) {
      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: alt || "", title: title || "" })
        .run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        // width: Math.max(320) || 640,
        // height: Math.max(180) || 480,
      });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e);
    }
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
  ];
  const FontOptions = [
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
  ];
  const AlignmentOptions = [
    {
      icon: <Minus className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: editor.isActive("horizontalRule"),
    },
  ];
  const ImageOptions = [
    {
      icon: <ImageIcon className="size-4" />,
      onClick: () => addImage(),
      pressed: editor.isActive("image"),
    },
    {
      icon: <Video className="size-4" />,
      onClick: () => addYoutubeVideo(),
      pressed: editor.isActive("youtube"),
    },
  ];

  const CodeOptions = [
    {
      icon: <Link2 className="size-4" />,
      onClick: () => setLink(),
      pressed: editor.isActive("link"),
    },
    {
      icon: <Link2Off className="size-4" />,
      onClick: () => editor.chain().focus().unsetLink().run(),
      pressed: !editor.isActive("link"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <SquareCode className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
    },
  ];
  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      {ImageOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      {CodeOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      {FontOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      {AlignmentOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
