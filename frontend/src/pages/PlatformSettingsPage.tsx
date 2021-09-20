import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PageLayoutWrapper from "./PageLayoutWrapper";
import { PlatformsContext } from "../components/PlatformsContextProvider";
import PlatformInterface from "../types/PlatformInterface";
import PlatformSettingsTable from "../components/PlatformSettingsTable";
import PlatformCreationButton from "../components/PlatformCreationButton";

const PlatformSettingsPage = (): JSX.Element => {
  const { platforms } = useContext(PlatformsContext);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>("");

  const handleChangeSelectedPlatform = (event: SelectChangeEvent) => {
    setSelectedPlatformId(event.target.value as string);
  };

  const getCurrentSelectedPlatform = (): null | PlatformInterface => {
    if (selectedPlatformId === "") {
      return null;
    }

    const [selectedPlatform] = platforms.filter((platform) => platform._id === selectedPlatformId);
    return selectedPlatform;
  };

  return (
    <PageLayoutWrapper>
      <Typography variant='h5' mb={4}>
        Manage Platforms
      </Typography>
      <Box display='flex' alignItems='center' gap={1} mb={3}>
        <FormControl>
          <Select
            value={selectedPlatformId}
            onChange={handleChangeSelectedPlatform}
            autoWidth
            sx={{ minWidth: "200px", borderRadius: 0 }}
            size='small'
            displayEmpty
          >
            <MenuItem value='' disabled>
              <em>--Select Platform--</em>
            </MenuItem>
            {platforms.map((platform: PlatformInterface) => {
              const { _id: platformId, title } = platform;
              return (
                <MenuItem value={platformId} key={platformId}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <PlatformCreationButton />
      </Box>
      <PlatformSettingsTable platform={getCurrentSelectedPlatform()} />
    </PageLayoutWrapper>
  );
};

export default PlatformSettingsPage;
