import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { DRAWER_WIDTH } from "../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: DRAWER_WIDTH,
    padding: 36,
  },
  button: {
    textTransform: "none",
  },
  subText: {
    maxWidth: "80%",
    marginBottom: 24,
  },
  title: {
    marginBottom: 36,
  },
}));

const LandingPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h3' className={classes.title}>
              Design Mondays: Your team's brainstorming workspace
            </Typography>
            <Typography color='textSecondary' className={classes.subText}>
              Building a data visualization product always starts with a list of questions from the customers who will
              be using it.
            </Typography>
            <Typography color='textSecondary' className={classes.subText}>
              If someone is actively exploring and analyzing data, they will have a question in mind that they demand
              answers.
            </Typography>
            <Typography color='textSecondary' className={classes.subText}>
              Our job as UX data designers is to anticipate these questions (FUD moments) and provide intuitive,
              user-friendly ways to find the answers in a dataset.
            </Typography>
          </Grid>
          <Grid item xs={false} md={6}>
            <img src='/assets/landing_page.svg' height='600px' alt='landing page' />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LandingPage;
