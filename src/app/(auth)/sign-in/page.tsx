import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getCurrentUserAction } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const currentUser = await getCurrentUserAction();
  if (currentUser) redirect("/");
  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default SignInPage;
