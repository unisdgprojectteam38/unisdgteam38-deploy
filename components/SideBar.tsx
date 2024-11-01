import React from 'react';
import { User, Search, LogOut, Settings, HelpCircle, Users, Award } from 'lucide-react';

interface NavItem {
  label: string;
  icon: string;
  href: string;
  children?: NavItem[];
}

// SDG Goals array
const sdgGoals: NavItem[] = [
  { 
    label: "No Poverty", 
    icon: "/navbar-icons/sdg/1.svg", 
    href: "/sdg/no-poverty" 
  },
  { 
    label: "Zero Hunger", 
    icon: "/navbar-icons/sdg/2.svg",
    href: "/sdg/zero-hunger" 
  },
  { 
    label: "Good Health And Well-Being", 
    icon: "/navbar-icons/sdg/1.svg",
    href: "/sdg/good-health" 
  },
  
];

// Main navigation items
const mainNavItems: NavItem[] = [
  { 
    label: "Dashboard", 
    icon: "/navbar-icons/dashboard-icon.svg",
    href: "/dashboard" 
  },
  { 
    label: "SDG", 
    icon: "/navbar-icons/sdg-icon.svg",
    href: "/sdg",
    children: sdgGoals
  },
  { 
    label: "Settings", 
    icon: "/navbar-icons/setting-icon.svg",
    href: "/settings" 
  },
];

interface SideBarProps {
  profileType?: 'Student' | 'Admin';
}

const SideBar: React.FC<SideBarProps> = ({ profileType = 'Student' }) => {
  return (
    <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-6 w-6" />
            <span className="font-semibold">Profile</span>
          </div>
          <nav>
            {[
              "Dashboard",
              "SDG",
              "Profile settings",
              "Logout",
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className={`block py-2 px-4 rounded ${
                  index === 0
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "text-subtle hover:bg-surface"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
  );
};

export default SideBar;