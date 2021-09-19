import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { DRAWER_WIDTH } from "../utils/constants";

const capitalizeFirstLetter = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

const Navbar = (): JSX.Element => {
  const { moduleId } = useParams<{ moduleId: string | undefined }>();

  const convertLinkToTitle = (moduleLink: string | undefined): string => {
    if (!moduleLink) {
      return "";
    }

    return (
      "# " +
      moduleLink
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ")
    );
  };

  return (
    <AppBar
      position='fixed'
      elevation={0}
      color='inherit'
      sx={{
        borderBottom: `1px solid`,
        borderColor: "divider",
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      }}
    >
      <Toolbar variant='dense'>
        <Typography color='textPrimary'>{convertLinkToTitle(moduleId)}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
