import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const CAPABILITY_MAX_LENGTH = 24;

interface ModuleCreationButtonProps {
  addModuleHandler: (moduleTitle: string) => Promise<void>;
}

const ModuleCreationButton = (props: ModuleCreationButtonProps): JSX.Element => {
  const { addModuleHandler } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [moduleInput, setModuleInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setModuleInput("");
  };

  const handleAddModule = async (): Promise<void> => {
    await addModuleHandler(moduleInput);
    handleClose();
  };

  return (
    <>
      <IconButton size='small' edge='end' onClick={() => setIsDialogOpen(true)} color='primary'>
        <AddIcon fontSize='small' />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='xs' fullWidth>
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
            inputProps={{ maxLength: CAPABILITY_MAX_LENGTH }}
            value={moduleInput}
            onChange={(e) => setModuleInput(e.target.value)}
            helperText={`${CAPABILITY_MAX_LENGTH - moduleInput.length} characters remaining`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
            Cancel
          </Button>
          <Button onClick={handleAddModule} color='primary' disabled={moduleInput.length === 0}>
            Add Module
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModuleCreationButton;
