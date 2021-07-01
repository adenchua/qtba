import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QTBATable from "../components/QTBATable";
import { DRAWER_WIDTH } from "../utils/constants";

const CapabilityPage = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container style={{ marginLeft: DRAWER_WIDTH }}>
        <Typography variant='h4'>Questions to Be Answered</Typography>
        <Box mt={4}>
          <QTBATable />
        </Box>
      </Container>
    </>
  );
};

export default CapabilityPage;
