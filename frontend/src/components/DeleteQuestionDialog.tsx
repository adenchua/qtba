import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import WarningIcon from "@material-ui/icons/WarningOutlined";

import QuestionInterface from "../types/QuestionInterface";
import { Box } from "@material-ui/core";

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
      <DialogTitle disableTypography>
        <Box display='flex' alignItems='center' gridGap={8}>
          <WarningIcon color='secondary' />
          <Typography variant='h6' color='secondary'>
            Are you sure you want to delete this question?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
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
