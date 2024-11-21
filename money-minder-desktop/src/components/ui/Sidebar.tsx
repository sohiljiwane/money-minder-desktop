import React from "react";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <i className="fas fa-home"></i> },
  {
    name: "Expense",
    path: "/expense",
    icon: <i className="fas fa-chart-line"></i>,
  },
  { name: "Users", path: "/users", icon: <i className="fas fa-users"></i> },
  {
    name: "Settings",
    path: "/settings",
    icon: <i className="fas fa-cog"></i>,
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  return (
    <div
      className={`bg-emerald-900 text-emerald-100 h-screen p-4 ${
        isCollapsed ? "w-16" : "w-64"
      } transition-width duration-300`}
    >
      <nav>
        <ul>
        <button
        className="ext-emerald-200 hover:text-white focus:outline-none mb-6"
        onClick={toggleSidebar}
      >
        <i
          className={`fas ${
            isCollapsed ? "fa-solid fa-bars" : "fa-solid fa-bars"
          } text-xl p-2`}
        />
      </button>
          {links.map((link, index) => (
            <li key={index} className="mb-6">
              <a
                href={link.path}
                className="flex items-center space-x-2 hhover:bg-emerald-800 hover:text-white p-2 rounded"
              >
                <span className="text-lg text-teal-300">{link.icon}</span>
                {!isCollapsed && <span>{link.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
