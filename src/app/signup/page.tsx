"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { signup } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const {toast} = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      startTransition(async () => {
    const {error} =  await signup(formData);
    if (error) {
        toast({
            title : "Error",
            description : error.message,
            variant : "destructive"
        })
    }
      });
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">SnapNote</CardTitle>
          <CardDescription className="text-center">
            Enter your details to signup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
            {isPending ? (<Loader2 className="animate-spin"/>): ("Signup")}
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            <Link
              href={"#"}
              className="hover:underline hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-sm">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
