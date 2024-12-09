import React from "react";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const authService = {
  async logout() {
    try {
      const accessToken = localStorage.getItem('user_token');
      console.log(accessToken);
      
      // Send logout request to backend
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      // Clear all stored user data
      localStorage.removeItem('user_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // New method to check if user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  // New method to get current user
  getCurrentUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}

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
  {
    name: "Logout",
    path: "/logout",
    icon: <i className="fas fa-sign-out-alt"></i>,
    onClick: async () => {
      try {
        await authService.logout();
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout failed', error);
        alert('Logout failed. Please try again.');
      }
    }
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const handleLogout = async () => {
    try {
      // Call the logout method from authService
      await authService.logout();
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      // Handle logout error (you might want to add error handling UI)
      console.error('Logout failed', error);
      alert('Logout failed. Please try again.');
    }
  };


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
                onClick={(e) => {
                  // Prevent default navigation for logout
                  if (link.name === "Logout") {
                    e.preventDefault();
                    link.onClick?.();
                  }
                }}
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
