import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import { DRAWER_WIDTH } from "../utils/constants";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    background: theme.palette.background.paper,
  },
}));

const capitalizeFirstLetter = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

const Navbar = (): JSX.Element => {
  const { capabilityId } = useParams<{ capabilityId: string | undefined }>();
  const classes = useStyles();

  const convertLinkToTitle = (capabilityLink: string | undefined): string => {
    if (!capabilityLink) {
      return "";
    }

    return (
      "# " +
      capabilityLink
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ")
    );
  };

  return (
    <AppBar position='fixed' className={classes.appBar} elevation={0}>
      <Toolbar variant='dense'>
        <Typography color='textPrimary'>{convertLinkToTitle(capabilityId)}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
