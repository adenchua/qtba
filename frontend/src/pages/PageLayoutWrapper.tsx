import React, { ReactNode } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface PageLayoutWrapperProps {
  children: ReactNode;
  withPadding: boolean;
}

const PageLayoutWrapper = ({ children, withPadding }: PageLayoutWrapperProps): JSX.Element => {
  if (!withPadding) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <Toolbar variant='dense' />
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar variant='dense' />
      <Container sx={{ mb: 8, pt: 4 }}>{children}</Container>
    </>
  );
};

export default PageLayoutWrapper;
