"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { OrderedList } from "@tiptap/extension-list";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  isVisibleMenuBar?: boolean;
}

const RichTextEditor = ({
  content,
  onChange,
  isVisibleMenuBar = true,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "bg-yellow-300" },
      }),
      Paragraph,
      Text,
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal ml-5" },
        itemTypeName: "listItem",
      }),
    ],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none border p-4 rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      // You can handle content updates here if needed
      onChange && onChange(editor.getHTML());
    },
  });

  return (
    <div>
      {isVisibleMenuBar && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
