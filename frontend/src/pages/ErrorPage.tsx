import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const ErrorPage = (): JSX.Element => {
  return (
    <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <div>
        <Typography variant='h1'>404.</Typography>
        <Typography variant='h3' gutterBottom>
          Oops, we don't know what happened.
        </Typography>
        <Button color='primary' size='large' component={Link} to='/'>
          Bring me home
        </Button>
      </div>
      <img src='/assets/404_page.svg' height='600px' alt='error' />
    </Box>
  );
};

export default ErrorPage;
