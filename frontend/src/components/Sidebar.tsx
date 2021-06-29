import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Link, useParams } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { VERSION_NUMBER, DRAWER_WIDTH } from "../utils/constants";
import PlatformCreationButton from "./PlatformCreationButton";
import CapabilityCreationButton from "./CapabilityCreationButton";

const PLATFORMS = [
  {
    name: "Platform 1",
    link: "Platform-1",
    capabilities: [
      {
        name: "Sentiment Analysis",
        link: "sentiment-analysis",
      },
      {
        name: "User Analysis",
        link: "user-analysis",
      },
    ],
  },
  {
    name: "Platform 2",
    link: "Platform-2",
    capabilities: [
      {
        name: "Sentiment Analysis",
        link: "sentiment-analysis",
      },
      {
        name: "User Analysis",
        link: "user-analysis",
      },
    ],
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    height: "100%",
  },
}));

const Sidebar = (): JSX.Element => {
  const classes = useStyles();
  const { capabilityId, platformId } = useParams<{ capabilityId: string; platformId: string }>();

  const isCapabilitySelected = (currentPlatform: string, currentCapability: string): boolean => {
    if (currentPlatform === platformId && currentCapability === capabilityId) {
      return true;
    }
    return false;
  };

  const renderSection = (platformLink: string, capabilityName: string, capabilityLink: string): JSX.Element => {
    return (
      <ListItem
        button
        style={{ paddingLeft: 32 }}
        dense
        component={Link}
        to={`/${platformLink}/${capabilityLink}`}
        key={capabilityLink}
      >
        <ListItemText disableTypography>
          <Typography
            variant='body2'
            color={isCapabilitySelected(platformLink, capabilityLink) ? "primary" : "textSecondary"}
          >
            {`# ${capabilityName}`}
          </Typography>
        </ListItemText>
      </ListItem>
    );
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
          <PlatformCreationButton />
        </Box>
        {PLATFORMS.map((platform) => {
          const { name: platformName, capabilities, link: platformLink } = platform;
          return (
            <List disablePadding key={platformLink}>
              <ListItem dense>
                <ListItemText primary={platformName} />
                <ListItemSecondaryAction>
                  <CapabilityCreationButton />
                </ListItemSecondaryAction>
              </ListItem>
              {capabilities.map((capability) => {
                const { name: capabilityName, link: capabilityLink } = capability;
                return renderSection(platformLink, capabilityName, capabilityLink);
              })}
            </List>
          );
        })}
      </Paper>
    </Drawer>
  );
};

export default Sidebar;
