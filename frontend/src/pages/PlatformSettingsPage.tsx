import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { DRAWER_WIDTH } from "../utils/constants";

const PlatformSettingsPage = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container sx={{ marginLeft: DRAWER_WIDTH }}>
        <Typography variant='h5'>Manage Platforms</Typography>
      </Container>
    </>
  );
};

export default PlatformSettingsPage;
