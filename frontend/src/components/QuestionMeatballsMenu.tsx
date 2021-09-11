import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";

import QuestionInterface from "../types/QuestionInterface";
import EditQuestionDialog from "./EditQuestionDialog";
import DeleteQuestionDialog from "./DeleteQuestionDialog";

interface QuestionMeatballsMenuProps {
  onStrikethroughHandler: (questionId: string) => Promise<void>;
  onUnStrikethroughHandler: (questionId: string) => Promise<void>;
  onEditQuestionHandler: (updatedQuestionTitle: string, questionId: string) => Promise<void>;
  onDeleteQuestionHandler: (questionId: string) => Promise<void>;
  question: QuestionInterface;
}

const QuestionMeatballsMenu = (props: QuestionMeatballsMenuProps): JSX.Element => {
  const { onStrikethroughHandler, onUnStrikethroughHandler, question, onEditQuestionHandler, onDeleteQuestionHandler } =
    props;
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

  const handleStrikethrough = () => {
    onStrikethroughHandler(questionId);
    handleClose();
  };

  const handleUnStikethroughQuestion = () => {
    onUnStrikethroughHandler(questionId);
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
        getContentAnchorEl={null}
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
          <Typography variant='body2' color='secondary'>
            Delete question
          </Typography>
        </MenuItem>
      </Menu>
      <EditQuestionDialog
        question={question}
        isOpen={isEditDialogOpen}
        onCloseHandler={handleCloseEditingDialog}
        onConfirmEditHandler={onEditQuestionHandler}
      />
      <DeleteQuestionDialog
        question={question}
        isOpen={isDeleteDialogOpen}
        onCloseHandler={handleCloseDeleteDialog}
        onConfirmDeleteHandler={onDeleteQuestionHandler}
      />
    </>
  );
};

export default QuestionMeatballsMenu;
