"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import { useNote } from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/note";
import { User } from "@prisma/client";
import NewNoteButton from "./NewNoteButton";

interface Props {
  noteId: string;
  user: any;
  startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText, user }: Props) {
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
  }, [noteIdParams, noteId, startingNoteText, setNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async () => {
      await updateNoteAction(noteId, text);
    }, debounceTimeout);
  };

  return (
    <div className="relative">
      <div className="absolute right-0 -top-10 mb-5">
        <NewNoteButton user={user} noteText={noteText} />
      </div>
      <Textarea
        value={noteText}
        onChange={handleUpdateNote}
        placeholder="Type your note here..."
        className=" mt-2 custom-scrollbar h-96 w-96 resize-none rounded-lg border p-3 text-base shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default NoteTextInput;