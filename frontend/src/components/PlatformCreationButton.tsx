import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const PLATFORM_MAX_LENGTH = 16;

interface PlatformCreationButtonProps {
  createPlatformHandler: (platformTitle: string) => Promise<void>;
}

const PlatformCreationButton = (props: PlatformCreationButtonProps): JSX.Element => {
  const { createPlatformHandler } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [platformInput, setPlatformInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setPlatformInput("");
  };

  const handleCreatePlatform = async (): Promise<void> => {
    await createPlatformHandler(platformInput);
    handleClose();
  };

  return (
    <>
      <IconButton size='small' edge='end' onClick={() => setIsDialogOpen(true)}>
        <AddIcon fontSize='small' />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>New Platform</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A platform is a sub-system of the application you are building. Examples include inventory management,
            human-resource and seller portal for an e-commerce application.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Platform Name'
            fullWidth
            inputProps={{ maxLength: PLATFORM_MAX_LENGTH }}
            value={platformInput}
            onChange={(e) => setPlatformInput(e.target.value)}
            helperText={`${PLATFORM_MAX_LENGTH - platformInput.length} characters remaining`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreatePlatform} color='primary' disabled={platformInput.length === 0}>
            Create Platform
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlatformCreationButton;
