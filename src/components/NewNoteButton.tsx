"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createaNoteAction } from "@/actions/note";
import { useToast } from "@/hooks/use-toast";

type Props = {
  user: any,
  noteText : string
};

function NewNoteButton({ user , noteText}: Props) {
  const router = useRouter();
  const {toast} = useToast();

  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const uuid = uuidv4();
      await createaNoteAction(uuid, noteText);
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
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24 cursor-pointer"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;