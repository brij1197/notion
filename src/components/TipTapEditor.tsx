"use client";
import React from "react";
import { EditorContent, useEditor, Extension } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import TipTapMenuBar from "./TipTapMenuBar";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "@ai-sdk/react";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const { complete, completion, error, isLoading } = useCompletion({
    api: "/api/completion",
  });
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.altKey && event.key === "a") {
          event.preventDefault();
          const prompt = view.state.doc.textContent
            .split(" ")
            .slice(-30)
            .join(" ");
          complete(prompt);
          return true;
        }
        return false;
      },
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        // Note saved successfully
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);
  return (
    <>
      <div className="flex gap-2">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
        <Button
          onClick={() => {
            const prompt =
              editor?.getText().split(" ").slice(-30).join(" ") || "";
            console.log("Test autocomplete:", prompt);
            complete(prompt);
          }}
          variant="secondary"
        >
          Test AI
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Alt + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </>
  );
};

export default TipTapEditor;
