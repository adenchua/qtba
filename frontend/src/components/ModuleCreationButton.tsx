import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import addModuleToPlatform from "../api/addModuleToPlatform";
import { PlatformsContext } from "./PlatformsContextProvider";
import { MODULE_MAX_LENGTH } from "../utils/constants";

interface ModuleCreationButtonProps {
  platformId: string;
}

const ModuleCreationButton = (props: ModuleCreationButtonProps): JSX.Element => {
  const { platformId } = props;
  const { addModuleToPlatform: addModuleToPlatformInContext } = useContext(PlatformsContext);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [moduleInput, setModuleInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setModuleInput("");
  };

  const handleAddModule = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const newModule = await addModuleToPlatform(moduleInput, platformId);
      addModuleToPlatformInContext(newModule, platformId);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton size='small' edge='end' onClick={() => setIsDialogOpen(true)} color='primary'>
        <AddIcon fontSize='small' />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='xs' fullWidth>
        <form onSubmit={handleAddModule}>
          <DialogTitle>New Module</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              variant='standard'
              margin='dense'
              placeholder='User Profile Page'
              InputProps={{
                startAdornment: <InputAdornment position='start'>#</InputAdornment>,
              }}
              fullWidth
              inputProps={{ maxLength: MODULE_MAX_LENGTH }}
              value={moduleInput}
              onChange={(e) => setModuleInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
              Cancel
            </Button>
            <Button type='submit' color='primary' disabled={moduleInput.length === 0}>
              Add Module
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ModuleCreationButton;
