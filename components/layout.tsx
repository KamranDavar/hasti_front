import Navbar from "./navbar";
import Footer from "./footer";
import { FC, ReactNode } from "react";
import Container from "@mui/material/Container";

type propsType = {
  children: ReactNode;
};

const Layout: FC<propsType> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </Container>
  );
};
export default Layout;
