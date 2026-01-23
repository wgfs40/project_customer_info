"use client";

import "./index.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Text from "@tiptap/extension-text";
import { OrderedList } from "@tiptap/extension-list";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Document } from "@tiptap/extension-document";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  isVisibleMenuBar?: boolean;
  isBorder: boolean;
}

const RichTextEditor = ({
  content,
  onChange,
  isVisibleMenuBar = true,
  isBorder = false,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      StarterKit,
      Dropcursor,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "bg-yellow-300" },
      }),

      Text,
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal ml-5" },
        itemTypeName: "listItem",
      }),
      Image.configure({
        resize: {
          enabled: isVisibleMenuBar ? true : false,
          directions: ["top", "bottom", "left", "right"], // can be any direction or diagonal combination
          alwaysPreserveAspectRatio: true,
          minWidth: 50,
          minHeight: 50,
        },        
        allowBase64: true,
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "my-4 mx-auto",
          width: "100%",
          height: "315",
        },
      }),      
    ],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none  p-4 ${isBorder ? "border border-gray-300" : ""} rounded-md`,
      },
    },
    onUpdate: ({ editor }) => {
      // You can handle content updates here if needed
      onChange && onChange(editor.getHTML());
    },
  });

  return (
    <div className="richTextEditor">
      {isVisibleMenuBar && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
