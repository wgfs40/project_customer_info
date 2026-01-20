"use client";
import { Editor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
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
    },
    {
      icon: <Heading2 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preseed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preseed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onclick: () => editor.chain().focus().toggleBold().run(),
      preseed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onclick: () => editor.chain().focus().toggleItalic().run(),
      preseed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onclick: () => editor.chain().focus().toggleStrike().run(),
      preseed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("left").run(),
      preseed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("right").run(),
      preseed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("center").run(),
      preseed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <List className="size-4" />,
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      preseed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onclick: () => editor.chain().focus().toggleOrderedList().run(),
      preseed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onclick: () => editor.chain().focus().toggleHighlight().run(),
      preseed: editor.isActive("highlight"),
    },
  ];
  return (
    <div className="border-b p-2 flex gap-2">
      {Options.map((option, index) => (
        <Toggle key={index} pressed={option.preseed} onClick={option.onclick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
