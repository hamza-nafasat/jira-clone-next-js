"use client";

import useGetCurrentUser from "../apis/use-get-current-user";
import { Loader, LogOut } from "lucide-react";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import useLogout from "../apis/use-logout";

const UserButton = () => {
  const { data: user, isLoading } = useGetCurrentUser();
  const { mutate, isPending } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300 ">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const name = user?.name;
  const email = user?.email;
  const avatarFallback = name ? name?.charAt(0)?.toUpperCase() : email?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium text-xl text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className=" flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
            <p className="text-sm font-medium text-neutral-900">{email || "user@mail.com"}</p>
          </div>
          <DottedSeparator className=" mb-1 " />
        </div>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => mutate({})}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-1" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
