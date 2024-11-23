import React, { useState } from "react";
import Sidebar from "../ui/Sidebar";
import { ChildrenProps } from "../../types/Children";

const SidebarLayout: React.FC<ChildrenProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex w-full">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      {children}
    </div>
  );
};

export default SidebarLayout;
