"use client"

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
import { Ghost, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { toast, useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { updateNoteAction } from "@/actions/note";
interface Props{
    noteId : string
    noteText : string
    updateNoteLocally : (noteId : string, newText : string)=>void
}
function UpdateNoteButton({noteId, noteText, updateNoteLocally}: Props) {
    const [isPending, startTransition] = useTransition();

    const handleUpdate = ()=>{
        try {
           startTransition(async()=>{
            await updateNoteAction(noteId, noteText);
            updateNoteLocally(noteId,noteText);
            toast({
                title : "Success",
                description : "Note upated Successfully",
                variant : "success"
            })
           })
        } catch (error) {
            console.error("Unable to update")
        }

    }
  return (
    <div>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute top-1/2 right-10 size-7 -translate-y-1/2 cursor-pointer p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
          variant={"ghost"}
        >
          <Upload/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to Update?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpdate}
            className=" cursor-pointer bg-green-600 text-destructive-foreground hover:bg-green-700/90 w-24"
          >
            {isPending ? <Loader2 /> : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
  )
}

export default UpdateNoteButton
