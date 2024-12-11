import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getCurrentUserAction } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const currentUser = await getCurrentUserAction();
  if (currentUser) redirect("/sign-in");
  return (
    <div>
      {" "}
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
