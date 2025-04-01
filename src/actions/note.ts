"use server";

import { prisma } from "@/lib/primsa";
import { getUser } from "@/auth/server";
import { Note } from "@prisma/client";
import { gemini } from "@/gemini";

export async function updateNoteAction(noteId: string, text: string) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("NO user");
    }

    await prisma?.note.update({ where: { id: noteId }, data: { text: text } });
  } catch (error) {
    console.error(error);
  }
}

export async function createaNoteAction(noteId: string, noteText: string) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Plese login to add a Note");
    }

    await prisma?.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: noteText,
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
    return { notes: notes };
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export async function DeleteNoteAction(noteId: string) {
  try {
    await prisma.note.delete({ where: { id: noteId } });
  } catch (error) {
    console.error("Unable to delete note");
  }
}


export async function askAiAboutNotesAction(
  newQuestion: string[],
  responses: string[],
) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Please login to ask the question");
    }

    const notes = await prisma.note.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      select: { text: true, createdAt: true, updatedAt: true },
    });

    if (notes.length === 0) {
      return "You don't have any notes";
    }

    const formattedNotes = notes
      .map((note) => 
        `Text: ${note.text}\n` +
        `Created: ${note.createdAt.toISOString()}\n` +
        `Updated: ${note.updatedAt.toISOString()}\n\n`
      )
      .join("");

    // STRICT FORMATTING SYSTEM PROMPT
    const systemPrompt = `
    STRICT FORMATTING RULES:
    -RESPOND TO GREETINGS
    -RESPOND TO EDUCATIONAL QUESTIONS
    -YOU ARE AN ASSITANT FOR THE WEBSITE CALLED SnapNote CREATED BY Sahil Thakur
    - Respond ONLY in valid HTML fragments
    - NEVER use plain text or markdown
    - ALWAYS use these tags: <ul>, <li>, <p>, <strong>
    - FORBIDDEN: headings, divs, spans, or any styling
    - Structure ALL lists properly with <ul> and <li>

    BAD EXAMPLE (REJECTED):
    "Key points: Item 1; Item 2"

    GOOD EXAMPLE (REQUIRED):
    <ul>
      <li><strong>Key point:</strong> Detailed explanation</li>
      <li><strong>Another point:</strong> More details</li>
    </ul>

    USER NOTES:
    ${formattedNotes}

    CURRENT QUESTION: ${newQuestion[newQuestion.length - 1]}
    `;

    // Initialize messages with formatting examples
    const messages = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      // Format enforcement examples
      {
        role: "user",
        parts: [{ text: "What are the key milestones?" }]
      },
      {
        role: "model",
        parts: [{
          text: "<ul><li><strong>Bad response:</strong> This would be rejected</li></ul>"
        }]
      },
      {
        role: "user",
        parts: [{ text: "That's incorrect formatting. Use proper HTML list structure" }]
      },
      {
        role: "model",
        parts: [{
          text: "<ul><li><strong>1651:</strong> William Harvey proposed fertilization theory</li><li><strong>1780:</strong> Spallanzani demonstrated sperm necessity</li></ul>"
        }]
      }
    ];

    // Add conversation history
    for (let i = 0; i < newQuestion.length; i++) {
      messages.push({
        role: "user",
        parts: [{ text: newQuestion[i] }]
      });
      
      if (responses[i]) {
        messages.push({
          role: "model",
          parts: [{ text: responses[i] }]
        });
      }
    }

    // Gemini API call with format enforcement
    const result = await gemini.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: messages,
    
    });

    // Proper response extraction
    const text = result.text || "No response generated";
    
    // Final format validation
    if (!/<(ul|li|p)[^>]*>/.test(text)) {
      return `<p>Formatting error: ${text}</p>`;
    }
    
    return text;

  } catch (error) {
    console.error("AI Error:", error);
    return "<p>Sorry, I encountered an error. Please try again.</p>";
  }
}