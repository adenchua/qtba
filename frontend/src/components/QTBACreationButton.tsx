import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { QUESTIONS_MAX_LENGTH } from "../utils/constants";
import ModuleInterface from "../types/ModuleInterface";
import addQuestionToModule from "../api/addQuestionToModule";
import { QuestionsContext } from "./QuestionsContextProvider";

interface QTBACreationButtonProps {
  module: ModuleInterface | null;
}

const QTBACreationButton = (props: QTBACreationButtonProps): JSX.Element => {
  const { module } = props;
  const { addQuestion } = useContext(QuestionsContext);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [questionInput, setQuestionInput] = useState<string>("");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setQuestionInput("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (!module) {
      return;
    }
    event.preventDefault();
    const { _id: moduleId } = module;
    const newQuestion = await addQuestionToModule(questionInput, moduleId);
    addQuestion(newQuestion);
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
              Phrase a question from the people that will be using it. Think about the how, where, when, who, what and
              why.
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
