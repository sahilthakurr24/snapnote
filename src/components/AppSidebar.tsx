import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarBarGroupContent from "./SidebarBarGroupContent";
import { shadow } from "@/styles/utils";
import { getNotes } from "@/actions/note";

export async function AppSidebar() {
  const user = await getUser();

  if (!user) {
    return null
  //  const  notes = await getNotes(user.id)
    // notes =
    //   (await prisma?.note.findMany({
    //     where: { authorId: user.id },
    //     orderBy: { updatedAt: "desc" },
    //   })) || [];
  }

  const { notes }: { notes: Note[] } = (await getNotes(user.id)) || { notes: [] };
  return (
    <Sidebar style={{ boxShadow: shadow }}>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-2 mb-2 text-lg">
            {user ? (
              "Your Notes"
            ) : (
              <p className="text-center">
                <Link className="underline" href={"/login"}>
                  Login
                </Link>{" "}
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarBarGroupContent notes={notes} />}
          {/* <SidebarBarGroupContent notes={notes} /> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
