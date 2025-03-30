"use server";

import { prisma } from "@/lib/primsa";
import { getUser } from "@/auth/server";

export async function updateNoteAction(noteId: string, text: string) {
  try {
 
    const user = await getUser();
    if (!user) {
      throw new Error("NO user");
    }

    await prisma?.note.update({ where: { id: noteId }, data: { text : text } });
  } catch (error) {
    console.error(error);
  }
}

export async function createaNoteAction(noteId: string) {
  try {
  
    const user =  await getUser();
    if (!user) {
      throw new Error("Plese login to add a Note");
    }

  
    await prisma?.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      },
    });
  } catch (error) {
    console.error("Unable to create Note");
  }
}

export async function getNotes(userId: string) {
  try {
    const notes = await prisma.note.findMany({
      where: { authorId: userId },
      orderBy: { updatedAt: "desc" },
    });
    return {notes : notes }
  } catch (error) {
    console.error("Something went wrong", error);
  }
}
