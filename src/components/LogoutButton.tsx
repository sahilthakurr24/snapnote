"use client";
import React, {  useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { logout } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";


 function LogoutButton() {

const [isPending, startTransition]  = useTransition();
const {toast} = useToast();

const handleLogout = ()=>{
    try {
    startTransition(async()=>{
        await logout();
        toast({
            title : "success",
            description : "Logout successfully",
            variant : "success"
        })
    })
        
    } catch (error : any) {
        toast({
            title : "error",
            description : "Unable to logout",
            variant : "destructive"
        })
        throw new Error("Cant logout user", error)
    }
}
    return (
      <Button className="w-24 cursor-pointer" variant={"outline"} onClick={handleLogout}>
        {isPending ? <Loader2 className="animate-spin" /> : "Log Out"}
      </Button>
    );
  }

export default LogoutButton;
