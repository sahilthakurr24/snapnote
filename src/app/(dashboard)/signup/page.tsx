// app/login/page.tsx

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert("Login submitted!");
  };

  return (
    <div className=" flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Snapnote</CardTitle>
          <CardDescription className="text-center">
            Enter your details to signup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Username</Label>
              <Input
                id="text"
                type="text"
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your emal"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Sign-up
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