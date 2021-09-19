import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";

import { VERSION_NUMBER, DRAWER_WIDTH } from "../utils/constants";
import PlatformInterface from "../types/PlatformInterface";
import PlatformSection from "./PlatformSection";
import getPlatforms from "../api/getPlatforms";

const Sidebar = (): JSX.Element => {
  const [platforms, setPlatforms] = useState<PlatformInterface[]>([]);

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

  return (
    <Drawer variant='permanent' anchor='left'>
      <Paper sx={{ width: DRAWER_WIDTH, height: "100%" }} elevation={0} square>
        <Box p={2} height='70px'>
          <Typography component={Link} to='/' sx={{ textDecoration: "none", color: "inherit" }}>
            🧱 Design Mondays
          </Typography>
          <Typography variant='caption' color='textSecondary' display='block'>
            {VERSION_NUMBER}
          </Typography>
        </Box>
        <Divider />
        <Box p={2} display='flex' alignItems='center' justifyContent='space-between' height='70px'>
          <Typography variant='h6'>Platforms</Typography>
          <IconButton size='small' color='primary' component={Link} to='/platform-settings'>
            <SettingsIcon fontSize='small' />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 156px)",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
        >
          {platforms.map((platform: PlatformInterface) => (
            <Box key={platform._id} mb={2}>
              <PlatformSection platform={platform} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Drawer>
  );
};

export default Sidebar;
