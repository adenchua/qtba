import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

import ModuleInterface from "../types/ModuleInterface";
import { MODULE_MAX_LENGTH } from "../utils/constants";
import { PlatformsContext } from "./PlatformsContextProvider";
import updateModuleTitle from "../api/updateModuleTitle";

interface EditModuleDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  module: ModuleInterface;
  platformId: string;
}

const EditModuleDialog = (props: EditModuleDialogProps): JSX.Element => {
  const { updateModuleTitle: updateModuleTitleInContext } = useContext(PlatformsContext);
  const { isOpen, onCloseHandler, module, platformId } = props;
  const { title, _id: moduleId } = module;
  const [moduleTitleInput, setModuleTitleInput] = useState<string>(title);

  const handleSubmit = async (): Promise<void> => {
    await updateModuleTitle(moduleId, moduleTitleInput);
    updateModuleTitleInContext(moduleId, platformId, moduleTitleInput);
    onCloseHandler();
  };

  const handleClose = () => {
    onCloseHandler();
    setModuleTitleInput(title);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogContent>
        <TextField
          margin='dense'
          variant='standard'
          fullWidth
          autoFocus
          InputProps={{
            startAdornment: <InputAdornment position='start'>#</InputAdornment>,
          }}
          inputProps={{ maxLength: MODULE_MAX_LENGTH }}
          helperText={`${MODULE_MAX_LENGTH - moduleTitleInput.length} characters remaining`}
          value={moduleTitleInput}
          onChange={(e) => setModuleTitleInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary' disabled={moduleTitleInput.length === 0}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModuleDialog;
