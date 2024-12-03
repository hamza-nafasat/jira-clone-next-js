import { getCurrentUserAction } from "@/features/auth/server/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUserAction();
  if (!currentUser) redirect("/sign-in");
  return (
    <div className="m-2 bg-neutral-600 p-4">
      <CreateWorkspaceForm />
    </div>
  );
}
