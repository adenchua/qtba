import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";

import QuestionInterface from "../types/QuestionInterface";

interface QuestionMeatballsMenuProps {
  onStrikethroughHandler: (questionId: string) => Promise<void>;
  onUnStrikethroughHandler: (questionId: string) => Promise<void>;
  question: QuestionInterface;
}

const QuestionMeatballsMenu = (props: QuestionMeatballsMenuProps): JSX.Element => {
  const { onStrikethroughHandler, onUnStrikethroughHandler, question } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
        <MenuItem onClick={handleClose} dense>
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
      </Menu>
    </>
  );
};

export default QuestionMeatballsMenu;
