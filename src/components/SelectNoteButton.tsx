"use client";
import { useNote } from "@/hooks/useNote";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

interface Props {
  note: Note;
}
function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectNoteText } = useNote();
  const [shouldUseGlobalNoteText, setSetShouldGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note.text);


  useEffect(() => {
    if (noteId === note.id) {
      setSetShouldGlobalNoteText(true);
    } else {
      setSetShouldGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectNoteText);
    }
  }, [selectNoteText, shouldUseGlobalNoteText, localNoteText]);

  const blankNoteText = "EMPTY NOTE";

  let noteText = localNoteText || blankNoteText;

  if (shouldUseGlobalNoteText) {
    noteText = selectNoteText || blankNoteText;
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId ? "bg-sidebar-accent/50" : ""}`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {note.text}
        </p>
        <p className="text-muted-foreground text-xs">
         updatedAt: {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
