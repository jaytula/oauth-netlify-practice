import React from "react";
import Toolbar from "../Toolbar/Toolbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Toolbar />
      {children}
    </div>
  );
};

export default Layout;
