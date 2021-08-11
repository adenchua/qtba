import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    textTransform: "none",
  },
}));

const ErrorPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant='h1'>404.</Typography>
        <Typography variant='h3' gutterBottom>
          Oops, we don't know what happened.
        </Typography>
        <Button color='primary' size='large' className={classes.button} component={Link} to='/'>
          Bring me home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
