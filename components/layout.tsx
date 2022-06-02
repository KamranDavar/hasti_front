import Navbar from "./navbar";
import Footer from "./footer";
import { FC, ReactNode } from "react";
import Container from "@mui/material/Container";
import Paper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


type propsType = {
  children: ReactNode;
};

const Layout: FC<propsType> = ({ children }) => {
  return (
    <FulllHeightPaper>
      <Container maxWidth="md">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </Container>
    </FulllHeightPaper>
  );
};
export default Layout;
const FulllHeightPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  minHeight:"100Vh",
}));

