"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { login } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";
import { Description, Title } from "@radix-ui/react-toast";


export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      startTransition(async () => {
       const {error} =  await login(formData);
        toast({
            title : "success",
            description : "Login successfully",
            variant : "success"
        })

        if (error) {
        
            toast({
                title : "Error",
                description :  error.message ||" Unable to Login",
                variant : "destructive"
            })
        }

      });
    } catch (error) {
      console.log("something went wrong");
      toast({
        title : "error",
        description : " Unable to Login",
        variant : "destructive"
    })
    }
  };
  return (
    <div className=" flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">SnapNote</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>
            <Button disabled= {isPending} type="submit" className="w-full cursor-pointer">
             {isPending ? (<Loader2 className="animate-spin"/>): ("Login")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            <Link href={"#"} className="hover:text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="text-sm">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
