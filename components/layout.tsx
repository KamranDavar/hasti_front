import Navbar from "./navbar";
import Footer from "./footer";
import { FC, ReactNode } from "react";

type propsType = {
  children: ReactNode;
};

const Layout: FC<propsType> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="grow">{children}</main>
      <Footer  />
    </div>
  );
};
export default Layout;
