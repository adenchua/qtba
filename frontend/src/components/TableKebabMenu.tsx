import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

interface TableKebabMenuProps {
  onToggleShowVoteCount: (newState: boolean) => void;
  showVoteCount: boolean;
}

const TableKebabMenu = (props: TableKebabMenuProps): JSX.Element => {
  const { onToggleShowVoteCount, showVoteCount } = props;
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

  return (
    <>
      <IconButton size='small' color='primary' onClick={handleClick}>
        <MoreVertIcon />
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
        <MenuItem onClick={handleToggleVoteCountVisibility} dense>
          <Typography variant='body2' color='primary'>
            {showVoteCount ? "Hide" : "Show"} vote count
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleClose} dense disabled>
          <Typography variant='body2' color='primary'>
            Disable voting
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} dense disabled>
          <Typography variant='body2' color='primary'>
            Reset votes
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
