"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import { useNote } from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/note";


interface Props {
  noteId: string;
  startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParams = useSearchParams().get("noteId") || "";
  const noteContext = useNote();
  if (!noteContext) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  const { noteText, setNoteText } = noteContext;
  useEffect(() => {
    if (noteIdParams === noteId) {
      setNoteText(startingNoteText);
    }
  }, [noteIdParams, noteIdParams, noteId, startingNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async() => {
       await updateNoteAction(noteId, text);
    }, debounceTimeout);
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your note here..."
      className="custom-scrollbar mb-4 h-96 w-96 resize-none rounded-lg border p-3 text-base shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
}

export default NoteTextInput;


