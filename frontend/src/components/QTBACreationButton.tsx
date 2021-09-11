import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { QUESTIONS_MAX_LENGTH } from "../utils/constants";

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
    fontWeight: "bolder",
  },
}));

interface QTBACreationButtonProps {
  onAddQuestionHandler: (title: string) => Promise<void>;
}

const QTBACreationButton = (props: QTBACreationButtonProps): JSX.Element => {
  const { onAddQuestionHandler } = props;
  const classes = useStyles();
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
        className={classes.button}
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
            <Button onClick={handleClose}>Cancel</Button>
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
