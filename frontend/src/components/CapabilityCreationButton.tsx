import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const CAPABILITY_MAX_LENGTH = 24;

const CapabilityCreationButton = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [capabilityInput, setCapabilityInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setCapabilityInput("");
  };

  return (
    <>
      <IconButton size='small' edge='end' onClick={() => setIsDialogOpen(true)}>
        <AddIcon fontSize='small' />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>New Capability</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            placeholder='Hashtag Analysis'
            InputProps={{
              startAdornment: <InputAdornment position='start'>#</InputAdornment>,
            }}
            fullWidth
            inputProps={{ maxLength: CAPABILITY_MAX_LENGTH }}
            value={capabilityInput}
            onChange={(e) => setCapabilityInput(e.target.value)}
            helperText={`${CAPABILITY_MAX_LENGTH - capabilityInput.length} characters remaining`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color='primary'>
            Add Capability
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CapabilityCreationButton;
