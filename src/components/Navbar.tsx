import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./Mode-toggle";
import LogoutButton from "./LogoutButton";
import { Separator } from "./ui/separator";

function Navbar() {
    const user:boolean = false
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8 border"
      style={{ boxShadow: shadow }}
    >
      <Link   prefetch={false} className="flex items-end gap-2" href={"/"}>
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          Snap<span>Note</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (

        //   <LogoutButton/>
        "lol"
        ) : (
          <>
             <Button asChild>
              <Link  prefetch={false} href="/signup" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button   asChild variant="outline">
              <Link  prefetch={false}  href="/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle/>
      </div>
    
    </header>
  );
}

export default Navbar;
