import React from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/WarningOutlined";

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
      <DialogTitle>
        <Box display='flex' alignItems='center' gap={1}>
          <WarningIcon color='error' />
          <Typography variant='h6' color='error'>
            Are you sure you want to delete this question?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} color='inherit' sx={{ color: "GrayText" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteQuestionDialog;
