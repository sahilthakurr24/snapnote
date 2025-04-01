import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NoteProvider from "@/providers/NoteProvider";

export const metadata: Metadata = {
  title: "Snapnote",
  description: "An Ai based note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NoteProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className="bg-popover flex min-h-screen w-full flex-col">
          <Navbar />

          <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
            {children}
          </main>

          {/* <Footer /> */}
        </div>
      </SidebarProvider>
    </NoteProvider>
  );
}
