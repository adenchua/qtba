import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";

import ModuleInterface from "../types/ModuleInterface";
import EditModuleDialog from "./EditModuleDialog";

interface EditModuleButtonProps {
  module: ModuleInterface;
  platformId: string;
}

const EditModuleButton = (props: EditModuleButtonProps): JSX.Element => {
  const { module, platformId } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton size='small' onClick={() => setIsDialogOpen(true)}>
        <EditIcon fontSize='small' />
      </IconButton>
      <EditModuleDialog
        platformId={platformId}
        module={module}
        isOpen={isDialogOpen}
        onCloseHandler={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default EditModuleButton;
