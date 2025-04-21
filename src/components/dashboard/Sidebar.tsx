import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PremiumCard } from "./PremiumCard";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Users, User, Building, Shield, Linkedin, Target, Calendar, User as UserIcon, Briefcase, BarChart, PhoneCall } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sidebar menu config
const managementLinks = [
  {
    label: "LinkedIn",
    path: "/linkedin",
    icon: <Linkedin size={20} />,
    badge: 3, // Hardcoded badge for demo purpose, remove or dynamically fetch as needed
  },
  {
    label: "Target",
    path: "/targets",
    icon: <Target size={20} />,
  },
  {
    label: "Events",
    path: "/calendar",
    icon: <Calendar size={20} />,
  },
  {
    label: "Lead",
    path: "/leads",
    icon: <UserIcon size={20} />,
  },
];

const userManagementLinks = [
  {
    label: "User",
    path: "/users",
    icon: <User size={20} />,
  },
  {
    label: "Organization",
    path: "/organizations",
    icon: <Building size={20} />,
  },
  {
    label: "Role",
    path: "/roles",
    icon: <Shield size={20} />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  // Sidebar collapse handler (hidden on mobile for simplicity)
  const toggleSidebar = () => setIsOpen((o) => !o);

  // Styles for active states & gradients
  const activeGradient = "bg-gradient-to-r from-[#4948d2] to-[#457fff]";
  const labelColor = "text-[#d8eafe]";
  const iconColor = "text-[#d8eafe]";
  const sectionLabel = "uppercase tracking-wide text-white/80 text-xs font-semibold mb-2 mt-2";

  // Main sidebar JSX
  return (
    <aside
      className={cn(
        "flex flex-col bg-gradient-to-br from-[#161F33] to-[#25284B] h-screen w-72 px-5 py-6 relative transition-all duration-300",
        !isOpen && "w-16 px-1"
      )}
      style={{ minWidth: isOpen ? "14rem" : "3.5rem" }}
    >
      {/* App Title */}
      <div className="flex items-center mb-5 h-10">
        <span
          className="text-2xl font-extrabold"
          style={{
            background: "linear-gradient(90deg, #4effa2 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ensar
        </span>
        <span
          className="text-2xl font-extrabold"
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #203fa1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: 2,
          }}
        >
          CRM
        </span>
        <button
          onClick={toggleSidebar}
          className="ml-auto text-white/70 hover:text-white rounded-full flex items-center justify-center p-1 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" fill="none">
            <path d="M8 5l4 5-4 5" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Premium Card */}
      {isOpen && <PremiumCard />}

      {/* Dashboard Link */}
      <nav className="mb-3">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg font-medium mb-2 transition",
            location.pathname === "/dashboard" ? activeGradient + " text-white" : iconColor + " hover:bg-white/10"
          )}
        >
          <LayoutDashboard size={20} />
          {isOpen && <span className="ml-1">Dashboard</span>}
        </Link>

        {/* User Management Group */}
        <div>
          <div className="flex items-center gap-2 mt-2 mb-1">
            <Users size={20} className="text-white" />
            {isOpen && <span className="font-semibold text-white">User Management</span>}
          </div>
          <div className={isOpen ? "ml-6 border-l border-white/10 pb-2" : ""}>
            {userManagementLinks.map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors",
                  location.pathname === path ? "text-white bg-white/10" : labelColor + " hover:bg-white/5"
                )}
              >
                {icon}
                {isOpen && <span>{label}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Management Group */}
        <div>
          <div className="flex items-center gap-2 mt-3 mb-1">
            <Briefcase size={20} className="text-white" />
            {isOpen && <span className="font-semibold text-white">Management</span>}
          </div>
          <div className={isOpen ? "ml-6 border-l border-white/10 pb-2" : ""}>
            {managementLinks.map(({ label, path, icon, badge }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-2 py-1 rounded-md mb-1 relative",
                  location.pathname === path
                    ? activeGradient + " text-white"
                    : labelColor + " hover:bg-white/5"
                )}
              >
                {icon}
                {isOpen && (
                  <>
                    <span>{label}</span>
                    {badge && (
                      <span className="ml-auto bg-gradient-to-r from-[#4948d2] to-[#457fff] text-white text-xs font-semibold rounded-full px-3 py-0.5">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User profile + logout */}
      {isOpen && (
        <div className="mb-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#32346e] to-[#224899] flex items-center justify-center">
            <span className="text-lg font-bold text-white/80">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-white/80 truncate">{user?.name || "User"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email || ""}</p>
          </div>
        </div>
      )}
      <button
        className={cn(
          "flex items-center gap-2 w-full justify-start text-white/70 hover:bg-white/5 rounded-lg px-3 py-2 transition",
          !isOpen && "justify-center"
        )}
        onClick={logout}
      >
        <svg width="18" height="18" fill="none">
          <path d="M15 3v2a4 4 0 0 1-4 4H5m8-6l3 3m0 0l-3 3m3-3H9" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {isOpen && <span>Sign out</span>}
      </button>
    </aside>
  );
}
