"use client";
import { Note } from "@prisma/client";
import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ghost, Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { DeleteNoteAction } from "@/actions/note";

interface Props {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
}
function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteNote = () => {
    try {
      startTransition(async () => {
        await DeleteNoteAction(noteId);
        deleteNoteLocally(noteId);
        toast({
          title: "Success",
          description: "Note Deleted Successfully",
          variant: "success",
        });
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="absolute top-1/2 right-2 size-7 -translate-y-1/2 cursor-pointer p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
            variant={"ghost"}
          >
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your note from our server
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className=" cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90 w-24"
            >
              {isPending ? <Loader2 /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteNoteButton;
