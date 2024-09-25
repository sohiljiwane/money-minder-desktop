import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";

const Dashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <i className="fas fa-home"></i> },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <i className="fas fa-chart-line"></i>,
    },
    { name: "Users", path: "/users", icon: <i className="fas fa-users"></i> },
    {
      name: "Settings",
      path: "/settings",
      icon: <i className="fas fa-cog"></i>,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar
        links={links}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 p-8 bg-gray-100 h-screen overflow-y-auto transition-margin duration-300
        }`}
      >
        <h1 className="text-3xl font-bold mb-8">Dashboard Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="mt-4 text-3xl">1,500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Active Sessions</h2>
            <p className="mt-4 text-3xl">300</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">New Signups</h2>
            <p className="mt-4 text-3xl">50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
