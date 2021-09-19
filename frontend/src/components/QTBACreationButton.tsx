import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { QUESTIONS_MAX_LENGTH } from "../utils/constants";

interface QTBACreationButtonProps {
  onAddQuestionHandler: (title: string) => Promise<void>;
}

const QTBACreationButton = (props: QTBACreationButtonProps): JSX.Element => {
  const { onAddQuestionHandler } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [questionInput, setQuestionInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setQuestionInput("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await onAddQuestionHandler(questionInput);
    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        disableElevation
        startIcon={<AddIcon />}
        onClick={() => setIsDialogOpen(true)}
      >
        Add Question
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Question to Be Answered</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Start with a list of questions from the people that will be using it. Think about the how, where, when,
              who, what and why.
            </DialogContentText>
            <TextField
              autoFocus
              variant='standard'
              margin='dense'
              placeholder='What causes our high employee attrition rates?'
              fullWidth
              inputProps={{ maxLength: QUESTIONS_MAX_LENGTH }}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              helperText={`${QUESTIONS_MAX_LENGTH - questionInput.length} characters remaining`}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
              Cancel
            </Button>
            <Button color='primary' disabled={questionInput.length === 0} type='submit'>
              Add Question
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default QTBACreationButton;
