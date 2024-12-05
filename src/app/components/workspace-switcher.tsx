"use client";

import useGetAllWorkspaces from "@/features/workspaces/apis/use-get-all-workspaces";
import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import { RiAddCircleFill } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetAllWorkspaces();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 font-bold">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>

      <Select>
        <SelectTrigger className="w-full bg-neutral-300 font-medium p-1">
          <SelectValue placeholder="No workspaces selected" />
        </SelectTrigger>

        <SelectContent>
          {workspaces?.documents?.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar image={workspace.image} name={workspace.name} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
