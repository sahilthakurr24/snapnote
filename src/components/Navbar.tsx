import { shadow } from "@/styles/utils";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./Mode-toggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

export async function Navbar() {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between border px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <div className="flex items-center gap-4">
        {/* <SidebarTrigger className="cursor-pointer" /> */}
        <Link prefetch={false} className="flex items-end gap-2" href={"/"}>
          <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
            SnapNote
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild>
              <Link prefetch={false} href="/signup" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link prefetch={false} href="/login">
                Login
              </Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
