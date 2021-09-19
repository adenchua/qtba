import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

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
            variant='standard'
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
          <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
            Cancel
          </Button>
          <Button onClick={handleCreatePlatform} color='primary' disabled={platformInput.length === 0}>
            Create Platform
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlatformCreationButton;
