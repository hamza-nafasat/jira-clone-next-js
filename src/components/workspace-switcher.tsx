"use client";

import useGetAllWorkspaces from "@/features/workspaces/apis/use-get-all-workspaces";
import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import { RiAddCircleFill } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import useCreateWorkspaceModal from "@/features/workspaces/hooks/use-create-workspace-modal";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspaces } = useGetAllWorkspaces();
  const { open } = useCreateWorkspaceModal();

  const onSelect = (id: string) => {
    if (id == "#") return;
    router.push(`/workspaces/${id}`);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 font-bold">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <Select onValueChange={onSelect} value={workspaceId || ""}>
        <SelectTrigger className="w-full bg-neutral-300 font-medium p-1">
          <SelectValue placeholder="No workspaces selected" />
        </SelectTrigger>

        <SelectContent>
          {workspaces?.total ? (
            workspaces?.documents?.map((workspace) => (
              <SelectItem key={workspace.$id} value={workspace.$id}>
                <div className="flex cursor-pointer justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar image={workspace.image} name={workspace.name} />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem key={1} value={"#"}>
              <div className=" pointer-events-none cursor-not-allowed flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar name={"No Workspaces"} />
                <span className="truncate">No Workspace</span>
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
