import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import QuestionInterface from "../types/QuestionInterface";
import { QUESTIONS_MAX_LENGTH } from "../utils/constants";

interface EditQuestionDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  question: QuestionInterface;
  onConfirmEditHandler: (updatedQuestionTitle: string, questionId: string) => Promise<void>;
}

const EditQuestionDialog = (props: EditQuestionDialogProps): JSX.Element => {
  const { isOpen, onCloseHandler, question, onConfirmEditHandler } = props;
  const { title, _id: questionId } = question;
  const [questionTitleInput, setQuestionTitleInput] = useState<string>(title);

  const handleSubmit = async (): Promise<void> => {
    await onConfirmEditHandler(questionTitleInput, questionId);
    onCloseHandler();
  };

  return (
    <Dialog open={isOpen} onClose={onCloseHandler} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          fullWidth
          autoFocus
          multiline
          rows={3}
          inputProps={{ maxLength: QUESTIONS_MAX_LENGTH }}
          helperText={`${QUESTIONS_MAX_LENGTH - questionTitleInput.length} characters remaining`}
          value={questionTitleInput}
          onChange={(e) => setQuestionTitleInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button onClick={handleSubmit} color='primary'>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionDialog;
