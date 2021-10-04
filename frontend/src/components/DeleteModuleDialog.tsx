import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/WarningAmber";

import ModuleInterface from "../types/ModuleInterface";
import deleteModule from "../api/deleteModule";
import { PlatformsContext } from "./PlatformsContextProvider";

interface DeleteModuleDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  module: ModuleInterface;
  platformId: string;
}

const DeleteModuleDialog = (props: DeleteModuleDialogProps): JSX.Element => {
  const { isOpen, onCloseHandler, module, platformId } = props;
  const { title, _id: moduleId } = module;
  const { deleteModuleFromPlatform } = useContext(PlatformsContext);

  const handleSubmit = async (): Promise<void> => {
    try {
      await deleteModule(moduleId);
      deleteModuleFromPlatform(moduleId, platformId);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later.");
    } finally {
      onCloseHandler();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseHandler} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' alignItems='start' gap={1}>
          <WarningIcon color='error' />
          <Typography color='error'>
            Are you sure you want to delete this module? This action is irreversible and will delete all the questions.
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText># {title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} color='inherit' sx={{ color: "GrayText" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModuleDialog;
