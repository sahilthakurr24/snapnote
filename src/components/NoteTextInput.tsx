"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { useNote } from "@/hooks/useNote";


import NewNoteButton from "./NewNoteButton";
import AskAiButton from "./AskAiButton";
import { User } from "@prisma/client";

interface Props {
  noteId: string;
  user: User;
  startingNoteText: string;
}



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
  };

  return (
    <div className="relative">
      <div className="absolute -top-10 right-0 mb-5 flex space-x-2">
        <AskAiButton  user={user}/>
        <NewNoteButton user={user} Text={noteText} />
      </div>
      <Textarea
        value={noteText}
        onChange={handleUpdateNote}
        placeholder="Type your note here..."
        className="custom-scrollbar mt-3 h-96 w-96 resize-none rounded-lg border p-3 text-base shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default NoteTextInput;
