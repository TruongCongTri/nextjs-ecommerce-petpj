import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadcrumbLayout from "@/components/layouts/breadcrumb";
import { ModeToggle } from "@/components/buttons/ModeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AppHeader() {
  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar sticky top-0 z-100">
      {/* <header className="sticky z-50 top-0 px-6 border-b border-neutral-300 dark:border-neutral-700 bg-white/20 dark:bg-[#0d101820] backdrop-blur-lg transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12   ">
       <div className="h-16 max-w-screen-xl w-full mx-auto flex items-center justify-between gap-6 "> */}
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbLayout />
        <ModeToggle />
      </div>
      <div className="flex items-center gap-2 px-4">
        <SignedIn>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
      {/* </div> */}
    </header>
  );
}
