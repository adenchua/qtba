import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
        <Box p={2}>
          <Typography>🧱 Design Mondays</Typography>
          <Typography variant='caption' color='textSecondary'>
            {VERSION_NUMBER}
          </Typography>
        </Box>
        <Divider />
        <Box p={2} display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2'>
            <b>PLATFORMS</b>
          </Typography>
          <PlatformCreationButton createPlatformHandler={handleCreatePlatform} />
        </Box>
        {platforms.map((platform: PlatformInterface) => (
          <PlatformSection platform={platform} key={platform._id} />
        ))}
      </Paper>
    </Drawer>
  );
};

export default Sidebar;
