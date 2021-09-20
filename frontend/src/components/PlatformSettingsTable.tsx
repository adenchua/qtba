import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import PlatformInterface from "../types/PlatformInterface";
import ModuleInterface from "../types/ModuleInterface";
import DeleteModuleButton from "./DeleteModuleButton";
import EditModuleButton from "./EditModuleButton";

interface PlatformSettingsTableProps {
  platform: PlatformInterface | null;
}

const PlatformSettingsTable = (props: PlatformSettingsTableProps): JSX.Element => {
  const { platform } = props;

  if (platform === null) {
    return (
      <Typography variant='body2' fontStyle='italic' color='text.disabled'>
        No platform selected
      </Typography>
    );
  }

  const { platformModules, _id: platformId } = platform;

  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: 500,
        maxWidth: 650,
        maxHeight: 650,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Modules</b>
            </TableCell>
            <TableCell align='right'>
              <b>Questions</b>
            </TableCell>
            <TableCell align='right'>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {platformModules?.map((module: ModuleInterface) => (
            <TableRow key={module._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} hover>
              <TableCell component='th' scope='row'>
                # {module.title}
              </TableCell>
              <TableCell align='right'>{module.questions.length}</TableCell>
              <TableCell align='right'>
                <EditModuleButton module={module} platformId={platformId} />
                <DeleteModuleButton module={module} platformId={platformId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlatformSettingsTable;
