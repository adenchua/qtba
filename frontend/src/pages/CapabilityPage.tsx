import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { DRAWER_WIDTH } from "../utils/constants";

const CapabilityPage = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container style={{ marginLeft: DRAWER_WIDTH }}>
        <Typography variant='h4'>Questions to Be Answered (QTBA)</Typography>
      </Container>
    </div>
  );
};

export default CapabilityPage;
