"use client";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Video,
} from "lucide-react";
import { Toggle } from "../toggle";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preseed: editor.isActive("heading", { level: 1 }),
      className: `${editor.isActive("heading", { level: 1 }) ? "font-bold" : ""}`,
    },
    {
      icon: <Heading2 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preseed: editor.isActive("heading", { level: 2 }),
      className: `${editor.isActive("heading", { level: 2 }) ? "font-bold" : ""}`,
    },
    {
      icon: <Heading3 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preseed: editor.isActive("heading", { level: 3 }),
      className: `${editor.isActive("heading", { level: 3 }) ? "font-bold" : ""}`,
    },
    {
      icon: <Bold className="size-4" />,
      onclick: () => editor.chain().focus().toggleBold().run(),
      preseed: editor.isActive("bold"),
      className: `${editor.isActive("bold") ? "font-bold" : ""}`,
    },
    {
      icon: <Italic className="size-4" />,
      onclick: () => editor.chain().focus().toggleItalic().run(),
      preseed: editor.isActive("italic"),
      className: `${editor.isActive("italic") ? "italic" : ""}`,
    },
    {
      icon: <Strikethrough className="size-4" />,
      onclick: () => editor.chain().focus().toggleStrike().run(),
      preseed: editor.isActive("strike"),
      className: `${editor.isActive("strike") ? "line-through" : ""}`,
    },
    {
      icon: <AlignLeft className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("left").run(),
      preseed: editor.isActive({ textAlign: "left" }),
      className: `${editor.isActive({ textAlign: "left" }) ? "text-left" : ""}`,
    },
    {
      icon: <AlignRight className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("right").run(),
      preseed: editor.isActive({ textAlign: "right" }),
      className: `${editor.isActive({ textAlign: "right" }) ? "text-right" : ""}`,
    },
    {
      icon: <AlignCenter className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("center").run(),
      preseed: editor.isActive({ textAlign: "center" }),
      className: `${editor.isActive({ textAlign: "center" }) ? "text-center" : ""}`,
    },
    {
      icon: <List className="size-4" />,
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      preseed: editor.isActive("bulletList"),
      className: `${editor.isActive("bulletList") ? "list-disc ml-5" : ""}`,
    },
    {
      icon: <ListOrdered className="size-4" />,
      onclick: () => editor.chain().focus().toggleOrderedList().run(),
      preseed: editor.isActive("orderedList"),
      className: `${editor.isActive("orderedList") ? "list-decimal ml-5" : ""}`,
    },
    {
      icon: <Highlighter className="size-4" />,
      onclick: () => editor.chain().focus().toggleHighlight().run(),
      preseed: editor.isActive("highlight"),
      className: `${editor.isActive("highlight") ? "bg-yellow-300" : ""}`,
    },
    {
      icon: <Video className="size-4" />,
      onclick: () => {
        const url = prompt("Enter video URL");
        if (url) {
          editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
      },
      preseed: false,
      className: ``,
    },
    {
      icon: <Image className="size-4" />,
      onclick: () => {
        const url = prompt("Enter image URL");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
      preseed: false,
      className: ``,
    },
  ];
  return (
    <div className="border-b p-2 flex gap-2">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preseed}
          onClick={option.onclick}
          className={option.className}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
