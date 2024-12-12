import { useParams } from "next/navigation";

const useWorkspaceId = () => {
  const params = useParams();
  const workspaceId: string = params.workspaceId as string;
  return workspaceId;
};

export { useWorkspaceId };
