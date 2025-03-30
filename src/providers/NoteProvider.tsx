"use client";

import React, { createContext, useState } from "react";

interface noteProviderContextType {
  noteText: string;
  setNoteText: (noteText: string) => void;
}

export const noteProviderContext = createContext<noteProviderContextType>({
  noteText: "",
  setNoteText: () => {},
});

function NoteProvider({ children }: { children: React.ReactNode }) {
  const [noteText, setNoteText] = useState("");

  return (
    <noteProviderContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </noteProviderContext.Provider>
  );

}

export default NoteProvider;
