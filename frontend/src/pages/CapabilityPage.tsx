import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QTBATable from "../components/QTBATable";
import { DRAWER_WIDTH } from "../utils/constants";

const useStyles = makeStyles((theme: Theme) => ({
  mb2: {
    marginBottom: theme.spacing(2),
  },
  container: {
    marginLeft: DRAWER_WIDTH,
  },
  inputWrapper: {
    border: `1px solid ${theme.palette.divider}`,
    height: 36,
    padding: "0px 8px",
    caretColor: theme.palette.primary.main,
  },
  button: {
    textTransform: "none",
    fontWeight: "bolder",
  },
}));

const CapabilityPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container className={classes.container}>
        <Typography variant='h4' color='textSecondary'>
          Questions to Be Answered
        </Typography>
        <Box mt={4}>
          <Grid container justify='flex-end' alignItems='center' className={classes.mb2} spacing={1}>
            <Grid item>
              <Paper elevation={0} className={classes.inputWrapper}>
                <InputBase placeholder='search' />
              </Paper>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                disableElevation
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add Question
              </Button>
            </Grid>
            <Grid item>
              <IconButton size='small' color='primary'>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
          <QTBATable />
        </Box>
      </Container>
    </>
  );
};

export default CapabilityPage;
