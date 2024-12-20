"use client";

import ResponsiveModel from "@/components/responsive-model";
import CreateWorkspaceForm from "./create-workspace-form";

const CreateWorkspaceModal = () => {
  return (
    <ResponsiveModel open onOpenChange={() => {}}>
      <CreateWorkspaceForm />
    </ResponsiveModel>
  );
};

export default CreateWorkspaceModal;
