"use client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createaNoteAction } from "@/actions/note";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import { useNote } from "@/hooks/useNote";


type Props = {
  user: User,
  Text : string
};

function NewNoteButton({ user , Text}: Props) {
  const router = useRouter();
  const {toast} = useToast();
  const {noteText} = useNote();


  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const uuid = uuidv4();
      await createaNoteAction(uuid, Text);
      toast({
        title : "Success",
        description : "Note Added Successfully",
        variant : "success"
      })
      router.push(`/?noteId=${uuid}&toastType=newNote`);

      setLoading(false);
    }
  };


return (
  <>
    {noteText.length === 0 ? (
      <Button
        variant="secondary"
        className="w-24 cursor-pointer"
      >
        New Note
      </Button>
    ) : (
      <Button
        onClick={handleClickNewNoteButton}
        variant="secondary"
        className="w-24 cursor-pointer"
        disabled={loading && noteText.length === 0}
      >
        {loading ? <Loader2 className="animate-spin" /> : "New Note"}
      </Button>
    )}
  </>
);
}

export default NewNoteButton;