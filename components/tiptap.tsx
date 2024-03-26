"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Strikethrough from "@tiptap/extension-strike";

export default function Tiptap({
  body,
  onChange,
}: {
  body: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Paragraph,
      BulletList,
      Strikethrough,
      ListItem,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
    ],

    content: body,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] p-3 border-input bg-back",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch ">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="" />
    </div>
  );
}
