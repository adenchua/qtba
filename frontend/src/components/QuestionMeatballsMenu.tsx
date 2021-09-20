import React, { useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";

import QuestionInterface from "../types/QuestionInterface";
import EditQuestionDialog from "./EditQuestionDialog";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import strikethroughQuestion from "../api/strikethroughQuestion";
import { QuestionsContext } from "./QuestionsContextProvider";
import unStrikethroughQuestion from "../api/unStrikethroughQuestion";

interface QuestionMeatballsMenuProps {
  question: QuestionInterface;
}

const QuestionMeatballsMenu = (props: QuestionMeatballsMenuProps): JSX.Element => {
  const { editQuestion } = useContext(QuestionsContext);
  const { question } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { _id: questionId, isStrikethrough } = question;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStrikethrough = async () => {
    await strikethroughQuestion(questionId);
    const updatedQuestion = question;
    updatedQuestion.isStrikethrough = true;
    editQuestion(updatedQuestion);
    handleClose();
  };

  const handleUnStikethroughQuestion = async () => {
    await unStrikethroughQuestion(questionId);
    const updatedQuestion = question;
    updatedQuestion.isStrikethrough = false;
    editQuestion(updatedQuestion);
    handleClose();
  };

  const handleCloseEditingDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenEditingDialog = () => {
    setIsEditDialogOpen(true);
    handleClose();
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleClose();
  };

  return (
    <>
      <IconButton size='small' onClick={handleClick}>
        <MoreHorizIcon fontSize='small' color='disabled' />
      </IconButton>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        elevation={2}
      >
        <MenuItem onClick={handleOpenEditingDialog} dense>
          <Typography variant='body2' color='primary'>
            Edit question
          </Typography>
        </MenuItem>
        {!isStrikethrough && (
          <MenuItem onClick={handleStrikethrough} dense>
            <Typography variant='body2' color='primary'>
              Strikethrough question
            </Typography>
          </MenuItem>
        )}
        {isStrikethrough && (
          <MenuItem onClick={handleUnStikethroughQuestion} dense>
            <Typography variant='body2' color='primary'>
              Undo strikethrough
            </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleOpenDeleteDialog} dense>
          <Typography variant='body2' color='error'>
            Delete question
          </Typography>
        </MenuItem>
      </Menu>
      <EditQuestionDialog isOpen={isEditDialogOpen} onCloseHandler={handleCloseEditingDialog} question={question} />
      <DeleteQuestionDialog isOpen={isDeleteDialogOpen} onCloseHandler={handleCloseDeleteDialog} question={question} />
    </>
  );
};

export default QuestionMeatballsMenu;
