import { getUser } from "@/auth/server";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/lib/primsa";
import { User } from "@prisma/client";
import { createClient } from "@/auth/server";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const supabase =  await createClient();

  // Properly destructure session from getSession()
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect to login if no session found
  if (!session) {
    redirect("/login");
  }

  const user = (await getUser()) as User | null;

  // Handle case where user doesn't exist in database
  if (!user) {
    console.error("User not found in database");
    redirect("/login");
  }

  // Properly access searchParams (no need for await)
  const noteIdParams = searchParams.noteId;
  const noteId = Array.isArray(noteIdParams) 
    ? noteIdParams[0] 
    : noteIdParams || "";

  // Fetch note only if noteId exists
  const note = noteId ? await prisma.note.findUnique({
    where: { 
      id: noteId,
      authorId: user.id 
    },
  }) : null;

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="max-4xl flex w-full justify-end"></div>
      <NoteTextInput
        noteId={noteId}
        startingNoteText={note?.text || ""}
        user={user}
      />
    </div>
  );
}