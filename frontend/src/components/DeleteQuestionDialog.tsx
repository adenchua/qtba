import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import QuestionInterface from "../types/QuestionInterface";

interface DeleteQuestionDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  question: QuestionInterface;
  onConfirmDeleteHandler: (questionId: string) => Promise<void>;
}

const DeleteQuestionDialog = (props: DeleteQuestionDialogProps): JSX.Element => {
  const { isOpen, onCloseHandler, question, onConfirmDeleteHandler } = props;
  const { title, _id: questionId } = question;

  const handleSubmit = async (): Promise<void> => {
    await onConfirmDeleteHandler(questionId);
    onCloseHandler();
  };

  return (
    <Dialog open={isOpen} onClose={onCloseHandler} maxWidth='sm' fullWidth>
      <DialogTitle>Are you sure you want to delete this question?</DialogTitle>
      <DialogContent>
        <DialogContentText>{title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteQuestionDialog;
