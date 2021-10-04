import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import PlatformInterface from "../types/PlatformInterface";
import ModuleInterface from "../types/ModuleInterface";
import ModuleCreationButton from "./ModuleCreationButton";

interface PlatformSectionProps {
  platform: PlatformInterface;
}

const PlatformSection = (props: PlatformSectionProps): JSX.Element => {
  const { platform } = props;
  const { title, slug, _id: currentPlatformId, platformModules } = platform;
  const { moduleSlug, platformSlug } = useParams<{ moduleSlug: string; platformSlug: string }>();

  const isModuleSelected = (currentPlatform: string, currentModule: string): boolean => {
    if (currentPlatform === platformSlug && currentModule === moduleSlug) {
      return true;
    }
    return false;
  };

  const renderModuleListItem = (module: ModuleInterface): JSX.Element => {
    const { title: moduleTitle, slug: moduleSlug } = module;
    return (
      <ListItemButton
        dense
        component={Link}
        to={`/platforms/${slug}/${moduleSlug}`}
        key={moduleSlug}
        sx={{ paddingLeft: 4 }}
      >
        <ListItemText disableTypography>
          <Typography variant='body2' color={isModuleSelected(slug, moduleSlug) ? "primary" : "textSecondary"} noWrap>
            {`# ${moduleTitle}`}
          </Typography>
        </ListItemText>
      </ListItemButton>
    );
  };

  return (
    <List
      disablePadding
      sx={{
        "& .hidden-child": {
          background: "red",
          visibility: "hidden",
        },
        ":hover .hidden-child": {
          visibility: "visible",
        },
      }}
    >
      <ListItem dense>
        <ListItemText primary={title} />
        <div className='hidden-child'>
          <ListItemSecondaryAction>
            <ModuleCreationButton platformId={currentPlatformId} />
          </ListItemSecondaryAction>
        </div>
      </ListItem>
      {platformModules?.map((module: ModuleInterface) => {
        return renderModuleListItem(module);
      })}
    </List>
  );
};

export default PlatformSection;
