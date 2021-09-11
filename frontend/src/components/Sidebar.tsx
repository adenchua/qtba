import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { VERSION_NUMBER, DRAWER_WIDTH } from "../utils/constants";
import PlatformCreationButton from "./PlatformCreationButton";
import PlatformInterface from "../types/PlatformInterface";
import PlatformSection from "./PlatformSection";
import getPlatforms from "../api/getPlatforms";
import addPlatform from "../api/addPlatform";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    height: "100%",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  platformWrapper: {
    height: "calc(100vh - 156px)",
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
}));

const Sidebar = (): JSX.Element => {
  const [platforms, setPlatforms] = useState<PlatformInterface[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const retrievePlatforms = async (): Promise<void> => {
      try {
        const response = await getPlatforms();
        setPlatforms(response);
      } catch (error) {
        // do nothing
      }
    };

    retrievePlatforms();
  }, []);

  const handleCreatePlatform = async (platformTitle: string): Promise<void> => {
    try {
      const newPlatform = await addPlatform(platformTitle);
      setPlatforms((prevState) => [...prevState, newPlatform]);
    } catch (error) {
      // do nothing
    }
  };

  return (
    <Drawer variant='permanent' anchor='left'>
      <Paper className={classes.drawer} elevation={0} square>
        <Box p={2} height={70}>
          <Typography component={Link} to='/' className={classes.link}>
            🧱 Design Mondays
          </Typography>
          <Typography variant='caption' color='textSecondary' display='block'>
            {VERSION_NUMBER}
          </Typography>
        </Box>
        <Divider />
        <Box p={2} display='flex' alignItems='center' justifyContent='space-between' height={70}>
          <Typography variant='h6'>Platforms</Typography>
          <PlatformCreationButton createPlatformHandler={handleCreatePlatform} />
        </Box>
        <div className={classes.platformWrapper}>
          {platforms.map((platform: PlatformInterface) => (
            <div key={platform._id} className={classes.mb2}>
              <PlatformSection platform={platform} />
            </div>
          ))}
        </div>
      </Paper>
    </Drawer>
  );
};

export default Sidebar;
