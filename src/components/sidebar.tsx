import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DottedSeparator } from "./dotted-separator";
import Navigation from "./navigation";
import WorkspaceSwitcher from "./workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-200 p-4 w-full">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={164} height={48} priority />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;