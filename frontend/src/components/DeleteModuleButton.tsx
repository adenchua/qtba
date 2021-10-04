import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

import DeleteModuleDialog from "./DeleteModuleDialog";
import ModuleInterface from "../types/ModuleInterface";

interface DeleteModuleButtonProps {
  module: ModuleInterface;
  platformId: string;
}

const DeleteModuleButton = (props: DeleteModuleButtonProps) => {
  const { module, platformId } = props;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton size='small' edge='end' color='error' onClick={() => setIsDeleteDialogOpen(true)}>
        <DeleteIcon fontSize='small' />
      </IconButton>
      <DeleteModuleDialog
        isOpen={isDeleteDialogOpen}
        onCloseHandler={() => setIsDeleteDialogOpen(false)}
        module={module}
        platformId={platformId}
      />
    </>
  );
};

export default DeleteModuleButton;
