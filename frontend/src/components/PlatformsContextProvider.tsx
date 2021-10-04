import React, { createContext, useState, ReactNode } from "react";
import ModuleInterface from "../types/ModuleInterface";
import PlatformInterface from "../types/PlatformInterface";

interface PlatformsContextProviderProps {
  children: ReactNode;
}

type PlatformsContextStateType = {
  platforms: PlatformInterface[];
  setPlatforms: (platforms: PlatformInterface[]) => void;
  addPlatform: (newPlatform: PlatformInterface) => void;
  addModuleToPlatform: (newModule: ModuleInterface, platformId: string) => void;
  deleteModuleFromPlatform: (moduleId: string, platformId: string) => void;
  updateModuleTitle: (moduleId: string, playformId: string, newTitle: string) => void;
};

const platformsContextDefaultValues: PlatformsContextStateType = {
  platforms: [],
  addPlatform: () => {},
  setPlatforms: () => {},
  addModuleToPlatform: () => {},
  deleteModuleFromPlatform: () => {},
  updateModuleTitle: () => {},
};

export const PlatformsContext = createContext<PlatformsContextStateType>(platformsContextDefaultValues);

const PlatformsContextProvider = ({ children }: PlatformsContextProviderProps): JSX.Element => {
  const [platforms, setPlatforms] = useState<PlatformInterface[]>([]);

  const addPlatform = (newPlatform: PlatformInterface): void => {
    setPlatforms((platforms) => [...platforms, newPlatform]);
  };

  const addModuleToPlatform = (newModule: ModuleInterface, platformId: string): void => {
    setPlatforms((platforms) =>
      platforms.map((platform) => {
        if (platform._id === platformId) {
          platform.platformModules?.push(newModule);
        }
        return platform;
      })
    );
  };

  const deleteModuleFromPlatform = (moduleId: string, platformId: string): void => {
    setPlatforms((platforms) =>
      platforms.map((platform) => {
        if (platform._id === platformId) {
          const filteredModules = platform.platformModules?.filter((module) => module._id !== moduleId);
          if (filteredModules) {
            platform.platformModules = filteredModules;
          }
        }
        return platform;
      })
    );
  };

  const updateModuleTitle = (moduleId: string, platformId: string, newTitle: string): void => {
    setPlatforms((platforms) =>
      platforms.map((platform) => {
        if (platform._id === platformId) {
          platform.platformModules?.map((module) => {
            if (module._id === moduleId) {
              module.title = newTitle;
            }
            return module;
          });
        }
        return platform;
      })
    );
  };

  return (
    <PlatformsContext.Provider
      value={{ platforms, setPlatforms, addPlatform, addModuleToPlatform, deleteModuleFromPlatform, updateModuleTitle }}
    >
      {children}
    </PlatformsContext.Provider>
  );
};

export default PlatformsContextProvider;
