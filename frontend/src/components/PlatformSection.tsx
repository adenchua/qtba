import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import { Link, useParams } from "react-router-dom";

import PlatformInterface from "../types/PlatformInterface";
import ModuleInterface from "../types/ModuleInterface";
import ModuleCreationButton from "./ModuleCreationButton";
import getPlatformModules from "../api/getPlatformModules";
import addModuleToPlatform from "../api/addModuleToPlatform";

interface PlatformSectionProps {
  platform: PlatformInterface;
}

const PlatformSection = (props: PlatformSectionProps): JSX.Element => {
  const [modules, setModules] = useState<ModuleInterface[]>([]);
  const { platform } = props;
  const { title, slug, modules: moduleIds, _id: currentPlatformId } = platform;
  const { moduleSlug, platformSlug } = useParams<{ moduleSlug: string; platformSlug: string }>();

  useEffect(() => {
    const retrieveModules = async (): Promise<void> => {
      try {
        const response = await getPlatformModules(moduleIds);
        setModules(response);
      } catch (error) {
        // do nothing
      }
    };

    retrieveModules();
  }, [moduleIds]);

  const isModuleSelected = (currentPlatform: string, currentModule: string): boolean => {
    if (currentPlatform === platformSlug && currentModule === moduleSlug) {
      return true;
    }
    return false;
  };

  const handleAddModule = async (moduleTitle: string): Promise<void> => {
    try {
      const newModule = await addModuleToPlatform(moduleTitle, currentPlatformId);
      setModules((prevState) => [...prevState, newModule]);
    } catch (error) {
      // do nothing
    }
  };

  const renderModuleListItem = (module: ModuleInterface): JSX.Element => {
    const { title: moduleTitle, slug: moduleSlug } = module;
    return (
      <ListItem
        button
        style={{ paddingLeft: 32 }}
        dense
        component={Link}
        to={`/${slug}/${moduleSlug}`}
        key={moduleSlug}
      >
        <ListItemText disableTypography>
          <Typography variant='body2' color={isModuleSelected(slug, moduleSlug) ? "primary" : "textSecondary"}>
            {`# ${moduleTitle}`}
          </Typography>
        </ListItemText>
      </ListItem>
    );
  };

  return (
    <List disablePadding>
      <ListItem dense>
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <ModuleCreationButton addModuleHandler={handleAddModule} />
        </ListItemSecondaryAction>
      </ListItem>
      {modules.map((module: ModuleInterface) => {
        return renderModuleListItem(module);
      })}
    </List>
  );
};

export default PlatformSection;
