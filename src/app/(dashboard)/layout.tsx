import Navbar from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import type { Metadata } from "next";


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
    <div className="flex min-h-screen w-full flex-col  bg-popover">
      <Navbar />
     
      <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
        {children}
      </main>
    
      <Footer/>
    </div>
  );
}
