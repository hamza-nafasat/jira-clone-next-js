import { getCurrentUserAction } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUserAction();
  if (!currentUser) redirect("/sign-in");
  return <div className="m-2">this is a home page </div>;
}
