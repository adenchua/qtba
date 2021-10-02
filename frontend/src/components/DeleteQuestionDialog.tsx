import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/WarningAmber";

import QuestionInterface from "../types/QuestionInterface";
import deleteQuestion from "../api/deleteQuestion";
import { QuestionsContext } from "./QuestionsContextProvider";

interface DeleteQuestionDialogProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  question: QuestionInterface;
}

const DeleteQuestionDialog = (props: DeleteQuestionDialogProps): JSX.Element => {
  const { deleteQuestion: deleteQuestionInContext } = useContext(QuestionsContext);
  const { isOpen, onCloseHandler, question } = props;
  const { title, _id: questionId } = question;

  const handleSubmit = async (): Promise<void> => {
    try {
      await deleteQuestion(questionId);
      deleteQuestionInContext(questionId);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again later.");
    } finally {
      onCloseHandler();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseHandler} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' alignItems='start' gap={1}>
          <WarningIcon color='error' />
          <Typography color='error'>Are you sure you want to delete this question?</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
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
