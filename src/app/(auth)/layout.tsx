"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        {/* nav bar  */}
        <nav className="flex justify-between items-center">
          <Image src={"/logo.svg"} alt="logo" width={164} height={48} priority />
          <div className="flex items-center gap-4">
            <Button asChild variant={"secondary"}>
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>{isSignIn ? "Sign Up" : "Login"}</Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-8">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
