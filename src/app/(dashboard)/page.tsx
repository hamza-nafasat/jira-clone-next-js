import { getCurrentUserAction } from "@/features/auth/server/actions";
import { getWorkspacesAction } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUserAction();
  if (!currentUser) redirect("/sign-in");

  const workspaces = await getWorkspacesAction();
  if (workspaces?.total < 1) redirect("/workspaces/create");
  else {
    redirect(`/workspaces/${workspaces?.documents?.[0]?.$id}`);
  }
}

{
  /* <div className="m-2 bg-neutral-600 p-4">
<CreateWorkspaceForm />
</div> */
}
