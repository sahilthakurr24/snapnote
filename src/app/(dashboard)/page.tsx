import { getUser } from "@/auth/server";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/lib/primsa";
import { User } from "@prisma/client";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Home({ searchParams }: Props) {

  const noteIdParams = (await searchParams).noteId;
  const user = (await getUser()) as User | null;

  if (!user) {
    throw new Error("User not found");
  }
  const noteId = Array.isArray(noteIdParams)
    ? noteIdParams![0]
    : noteIdParams || "";

  const note = await prisma?.note.findUnique({
    where: { id: noteId, authorId: user.id },
  });
 
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
