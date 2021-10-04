import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

import addPlatform from "../api/addPlatform";
import { PLATFORM_MAX_LENGTH } from "../utils/constants";
import { PlatformsContext } from "./PlatformsContextProvider";

const PlatformCreationButton = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [platformInput, setPlatformInput] = useState<string>("");
  const { addPlatform: addPlatformInContext } = useContext(PlatformsContext);

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setPlatformInput("");
  };

  const handleCreatePlatform = async (): Promise<void> => {
    try {
      const newPlatform = await addPlatform(platformInput);
      addPlatformInContext(newPlatform);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later.");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button size='large' onClick={() => setIsDialogOpen(true)} startIcon={<AddIcon />}>
        Create Platform
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>New Platform</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant='standard'
            margin='dense'
            label='Platform'
            placeholder='Inventory Management System'
            fullWidth
            inputProps={{ maxLength: PLATFORM_MAX_LENGTH }}
            value={platformInput}
            onChange={(e) => setPlatformInput(e.target.value)}
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
