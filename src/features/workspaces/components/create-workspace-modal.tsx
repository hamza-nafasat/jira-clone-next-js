"use client";

import ResponsiveModel from "@/components/responsive-model";
import CreateWorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceModal from "../hooks/user-create-workspace-modal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspaceModal();
  return (
    <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm />
    </ResponsiveModel>
  );
};

export default CreateWorkspaceModal;


[
  ["Parsons Infrastructure Organization (PTG)", 144000, 52000, 18000, 214000],
  ["Other Subsidiary 1", 120000, 30000, 15000, 165000],
  ["Other Subsidiary 2", 130000, 40000, 12000, 182000],
  ["Other Subsidiary 3", 110000, 25000, 11000, 146000]
]

[{
  Parsons Infrastructure Organization (PTG): 144000,
},
{
  Other Subsidiary 1: 120000,
},
{
  Other Subsidiary 2: 130000,
},
{
  Other Subsidiary 3: 110000,
}]