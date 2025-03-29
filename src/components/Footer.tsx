// components/site-footer.tsx

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { shadow } from "@/styles/utils";

export function Footer() {
  return (
    <footer className="w-full border-t bg-popover mt-9" 
       style={{ boxShadow: shadow }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Brand Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Your Brand</h3>
            <p className="text-sm text-muted-foreground">
              Making your experience better
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-1">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-1">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Developers</h4>
              <ul className="space-y-1">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">API</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Status</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#" className="text-muted-foreground">Terms</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#" className="text-muted-foreground">Privacy</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#" className="text-muted-foreground">Cookies</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}