import React from "react";

type SidebarProps = {
  links: { name: string; path: string; icon: JSX.Element }[];
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  links,
  isCollapsed,
  toggleSidebar,
}) => {
  return (
    <div
      className={`bg-squeezeGreen text-white h-screen p-4 ${
        isCollapsed ? "w-16" : "w-64"
      } transition-width duration-300`}
    >
      <nav>
        <ul>
        <button
        className="text-white focus:outline-none mb-6"
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
                className="flex items-center space-x-2 hover:bg-darkGreen p-2 rounded"
              >
                <span className="text-lg">{link.icon}</span>
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
