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
      <IconButton size='small' edge='end' onClick={() => setIsDialogOpen(true)}>
        <AddIcon fontSize='small' />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>New Module</DialogTitle>
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
            value={moduleInput}
            onChange={(e) => setModuleInput(e.target.value)}
            helperText={`${CAPABILITY_MAX_LENGTH - moduleInput.length} characters remaining`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddModule} color='primary' disabled={moduleInput.length === 0}>
            Add Module
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModuleCreationButton;
