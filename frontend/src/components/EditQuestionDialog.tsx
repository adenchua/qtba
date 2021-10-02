import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import QuestionInterface from "../types/QuestionInterface";
import { QUESTIONS_MAX_LENGTH } from "../utils/constants";
import updateQuestion from "../api/updateQuestion";
import { QuestionsContext } from "./QuestionsContextProvider";

interface EditQuestionDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  question: QuestionInterface;
}

const EditQuestionDialog = (props: EditQuestionDialogProps): JSX.Element => {
  const { editQuestion: editQuestionInContext } = useContext(QuestionsContext);
  const { isOpen, onCloseHandler, question } = props;
  const { title, _id: questionId } = question;
  const [questionTitleInput, setQuestionTitleInput] = useState<string>(title);

  const handleSubmit = async (): Promise<void> => {
    try {
      await updateQuestion(questionTitleInput, questionId);
      const updatedQuestion = question;
      updatedQuestion.title = questionTitleInput;
      editQuestionInContext(updatedQuestion);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later.");
    } finally {
      onCloseHandler();
    }
  };

  const handleClose = () => {
    onCloseHandler();
    setQuestionTitleInput(title);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogContent>
        <TextField
          margin='dense'
          variant='standard'
          fullWidth
          autoFocus
          multiline
          rows={3}
          inputProps={{ maxLength: QUESTIONS_MAX_LENGTH }}
          value={questionTitleInput}
          onChange={(e) => setQuestionTitleInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='inherit' sx={{ color: "GrayText" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary' disabled={questionTitleInput.length === 0}>
          Update Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionDialog;
