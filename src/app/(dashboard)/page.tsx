import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { createClient } from "@/auth/server";
import { getUser } from "@/auth/server";
import { prisma } from "@/lib/primsa";
import NoteTextInput from "@/components/NoteTextInput";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
 
  const supabase = await  createClient();
  const { data: { session } } = await supabase.auth.getSession();


  if (!session) redirect("/login");


  const user = (await getUser()) as User | null;
  if (!user) {
    console.error("Authentication error: No user record found");
    redirect("/login");
  }


  const noteIdParam = searchParams.noteId;
  const noteId = Array.isArray(noteIdParam) 
    ? noteIdParam[0] 
    : noteIdParam || ""

 
  const existingNote = noteId
    ? await prisma.note.findUnique({
        where: { 
          id: noteId,
          authorId: user.id 
        },
      })
    : null;

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="max-4xl flex w-full justify-end">
       
      </div>
      
      {user ? (
        <NoteTextInput
          noteId={noteId}
          startingNoteText={existingNote?.text || ""}
          user={user}
        />
      ) : (
        "Please log in to continue"
      )}
    </div>
  );
}