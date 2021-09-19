import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { DRAWER_WIDTH } from "../utils/constants";

const LandingPage = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Box p={4} ml={DRAWER_WIDTH}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h3' mb={4}>
              Design Mondays: Your team's brainstorming workspace
            </Typography>
            <Typography color='textSecondary' mb={3} maxWidth='80%'>
              Building a data visualization product always starts with a list of questions from the customers who will
              be using it.
            </Typography>
            <Typography color='textSecondary' mb={3} maxWidth='80%'>
              If someone is actively exploring and analyzing data, they will have a question in mind that they demand
              answers.
            </Typography>
            <Typography color='textSecondary' mb={3} maxWidth='80%'>
              Our job as UX data designers is to anticipate these questions (FUD moments) and provide intuitive,
              user-friendly ways to find the answers in a dataset.
            </Typography>
          </Grid>
          <Grid item xs={false} md={6}>
            <img src='/assets/landing_page.svg' height='600px' alt='landing page' />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
