"use client";

import { Button } from "@/components/ui/button";
import useGetCurrentUser from "@/features/auth/api/use-getCurrentUser";
import useLogout from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetCurrentUser();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/sign-in ");
    } else {
      console.log("data", data);
    }
  });
  return (
    <div className="m-2">
      only visible to logged in users
      <Button onClick={mutate}>Logout</Button>
    </div>
  );
}
