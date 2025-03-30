"use client";
import { Note } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { SidebarGroupContent as SidebarGroupContentShadCn, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";


interface Prop {
  notes: Note[];
}

function SidebarBarGroupContent({ notes }: Prop) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  // console.log("notes", filteredNotes);

  return (
    <SidebarGroupContentShadCn>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="mg-muted pl-8"
          placeholder="Search your notes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
     
      </div>
      <SidebarMenu>
       {filteredNotes.length===0 ? ("No Notes "): ( filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />
            {note.text}
            <DeleteNoteButton noteId={note.id} deleteNoteLocally={deleteNoteLocally} />
          </SidebarMenuItem>
        )))}
      </SidebarMenu>
    </SidebarGroupContentShadCn>
  );
}

export default SidebarBarGroupContent;
