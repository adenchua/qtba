import React, { ReactNode } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface PageLayoutWrapperProps {
  children: ReactNode;
}

const PageLayoutWrapper = ({ children }: PageLayoutWrapperProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container>{children}</Container>
    </>
  );
};

export default PageLayoutWrapper;
