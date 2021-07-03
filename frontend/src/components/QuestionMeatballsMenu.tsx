import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";

const QuestionMeatballsMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose} dense>
          <Typography variant='body2' color='primary'>
            Strikethrough question
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default QuestionMeatballsMenu;
