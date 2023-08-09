import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BsTypeBold, BsTypeH1 } from "react-icons/bs";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { MdRedo, MdUndo } from "react-icons/md";
import {
  GrTextAlignRight,
  GrTextAlignLeft,
  GrTextAlignCenter,
} from "react-icons/gr";
import TextAlign from "@tiptap/extension-text-align";
import { ForwardRefRenderFunction, useEffect, useState } from "react";
import React from "react";

interface Props {
  loadedContent: string;
  error?: boolean;
  onChange: (...event: any[]) => void;
}
interface RichTextEditorRef {
  getEditorContent: () => string;
}

const TipTap: ForwardRefRenderFunction<RichTextEditorRef, Props> = (
  { loadedContent, error, onChange, ...rest },
  ref
) => {
  const [wrappedContent, setWrappedContent] = useState<string>("");
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
  const editor = useEditor(
    {
      extensions: [
        TextAlign.configure({
          types: ["heading", "paragraph", "list", "marker"],
          alignments: ["left", "right", "center"],
          defaultAlignment: "right",
        }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
      ],
      content: loadedContent,
      onUpdate: ({ editor }) => {
        setWrappedContent(
          `<div class="tiptap" style="direction: ${direction};">${editor.getHTML()}</div>`
        );
      },
    },
    [direction]
  );

  useEffect(() => {
    onChange(wrappedContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrappedContent]);

  useEffect(() => {
    editor?.commands.setContent(
      `<div class="tiptap" style="direction: ${direction};">${loadedContent}</div>`
    );
  }, [loadedContent]);

  //Sets direction of content if content is loaded
  useEffect(() => {
    if (loadedContent)
      setDirection(loadedContent.includes("direction: ltr") ? "ltr" : "rtl");
  }, [loadedContent]);

  return (
    <div>
      <MenuBar
        direction={direction}
        setDirection={setDirection}
        editor={editor}
      />
      <EditorContent
        style={{ direction }}
        className={`tiptap border h-[500px] overflow-y-auto border-neutral-300 rounded-b-secondary p-6${
          error ? " border-red-500" : ""
        }`}
        editor={editor}
      />
    </div>
  );
};
const RichTextEditor = React.forwardRef(TipTap);

export default RichTextEditor;

interface MenuBarProps {
  editor: Editor | null;
  setDirection: React.Dispatch<React.SetStateAction<"ltr" | "rtl">>;
  direction: "ltr" | "rtl";
}

const MenuBar = ({ editor, setDirection, direction }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const buttonClasses = (bool: boolean) => {
    return `${
      bool ? "bg-secondary text-white" : ""
    } border border-neutral-300 p-2 rounded-md disabled:opacity-30 transition`;
  };

  return (
    <div className="flex flex-wrap gap-2 border rounded-t-secondary border-neutral-300 border-b-0 p-2">
      <button
        type="button"
        title="ضخیم"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={buttonClasses(editor.isActive("bold"))}
      >
        <BsTypeBold />
      </button>
      <button
        type="button"
        title="عنوان"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClasses(editor.isActive("heading", { level: 1 }))}
      >
        <BsTypeH1 />
      </button>
      <button
        title="لیست"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClasses(editor.isActive("bulletList"))}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        title="لیست عددی"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClasses(editor.isActive("orderedList"))}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        title="از چپ"
        type="button"
        onClick={() => setDirection("ltr")}
        className={buttonClasses(direction === "ltr")}
      >
        <GrTextAlignLeft />
      </button>
      <button
        title="از راست"
        type="button"
        onClick={() => setDirection("rtl")}
        className={buttonClasses(direction === "rtl")}
      >
        <GrTextAlignRight />
      </button>
      <button
        title="بازگشت به تغییر قبلی"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={buttonClasses(false)}
      >
        <MdUndo />
      </button>
      <button
        title="بازگشت به تغییر حذف شده"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={buttonClasses(false)}
      >
        <MdRedo />
      </button>
    </div>
  );
};
