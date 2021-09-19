import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface TableKebabMenuProps {
  onToggleShowVoteCount: (newState: boolean) => void;
  onResetAllVotesHandler: () => Promise<void>;
  showVoteCount: boolean;
}

const TableKebabMenu = (props: TableKebabMenuProps): JSX.Element => {
  const { onToggleShowVoteCount, showVoteCount, onResetAllVotesHandler } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleVoteCountVisibility = (): void => {
    onToggleShowVoteCount(!showVoteCount);
    handleClose();
  };

  const handleResetAllVotes = (): void => {
    onResetAllVotesHandler();
    handleClose();
  };

  return (
    <>
      <IconButton size='small' color='primary' onClick={handleClick}>
        <MoreVertIcon />
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
        <MenuItem onClick={handleToggleVoteCountVisibility} dense>
          <Typography variant='body2' color='primary'>
            {showVoteCount ? "Hide" : "Show"} vote count
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleResetAllVotes} dense>
          <Typography variant='body2' color='primary'>
            Reset votes
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} dense disabled>
          <Typography variant='body2' color='primary'>
            Disable voting
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} dense disabled>
          <Typography variant='body2' color='primary'>
            Export as csv
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableKebabMenu;
