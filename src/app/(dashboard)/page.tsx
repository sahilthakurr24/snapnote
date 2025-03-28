'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  return (
  <div className="min-h-screen flex justify-center items-center bg-gray-700 text-white">
     <div className="text-center">Will continue this shit sonn...
  <Button onClick={()=>{ router.push("lol.com")}} className = "mt-2 w-full p-0.5 text-white cursor-pointer" type="button" variant={"outline"}>Stay Tune</Button>
 </div>
 </div>
  );
}
