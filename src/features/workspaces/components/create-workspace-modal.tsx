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
