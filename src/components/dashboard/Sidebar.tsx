
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PremiumCard } from "./PremiumCard";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  User,
  Shield,
  Building,
  Target,
  Projects,
  UserTasks,
  Leads,
  Organizations,
  Linkedin,
  Events,
  Cms,
  ContentList,
  MailList,
  Deals,
  BarChart,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sidebar menu configs
const userManagementLinks = [
  { label: "Users", path: "/users", icon: <User size={20} /> },
  { label: "Roles", path: "/roles", icon: <Shield size={20} /> },
  { label: "Organizations", path: "/organizations", icon: <Building size={20} /> },
];
const managementLinks = [
  { label: "Targets", path: "/targets", icon: <Target size={20} /> },
  { label: "Projects", path: "/projects", icon: <Projects size={20} /> },
  { label: "User Tasks", path: "/user-tasks", icon: <UserTasks size={20} /> },
  { label: "Leads", path: "/leads", icon: <Leads size={20} /> },
  { label: "LinkedIn", path: "/linkedin", icon: <Linkedin size={20} /> },
  { label: "Events", path: "/events", icon: <Events size={20} /> },
  {
    label: "CMS",
    icon: <Cms size={20} />,
    children: [
      { label: "Content List", path: "/cms-content-list", icon: <ContentList size={20} /> },
      { label: "Mail List", path: "/cms-mail-list", icon: <MailList size={20} /> },
    ],
  },
  { label: "Deals", path: "/deals", icon: <Deals size={20} /> },
  { label: "Reports", path: "/reports", icon: <BarChart size={20} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  const [mgmtOpen, setMgmtOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);
  const toggleSection = (type: "user" | "mgmt" | "cms") => {
    if (type === "user") setUserMgmtOpen((o) => !o);
    if (type === "mgmt") setMgmtOpen((o) => !o);
    if (type === "cms") setCmsOpen((o) => !o);
  };

  // Styling constants
  const activeGradient = "bg-gradient-to-r from-[#4948d2] to-[#457fff]";
  const labelColor = "text-[#161F33]";
  const iconColor = "text-[#161F33]";
  const sectionLabel = "uppercase tracking-wide text-[#8A898C] text-xs font-semibold mb-2 mt-2";

  return (
    <aside
      className={cn(
        "flex flex-col bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] h-screen w-64 px-5 py-6 relative transition-all duration-300 border-r border-[#403E43]",
        !isSidebarOpen && "w-16 px-1"
      )}
      style={{ minWidth: isSidebarOpen ? "16rem" : "3.5rem" }}
    >
      <div className="flex items-center mb-5 h-10">
        <span className="text-2xl font-extrabold"
          style={{
            background: "linear-gradient(90deg, #4effa2 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
          Ensar
        </span>
        <span className="text-2xl font-extrabold"
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #203fa1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: 2
          }}>
          CRM
        </span>
        <button
          onClick={toggleSidebar}
          className="ml-auto text-[#161F33] hover:text-[#1EAEDB] rounded-full flex items-center justify-center p-1 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <ChevronDown size={20} className={isSidebarOpen ? "rotate-0 transition-transform" : "rotate-90 transition-transform"} />
        </button>
      </div>
      {/* Premium Card */}
      {isSidebarOpen && <PremiumCard />}

      {/* Main navigation */}
      <nav className="mb-3 mt-2">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg font-medium mb-2 transition",
            location.pathname === "/dashboard" ? activeGradient + " text-white" : iconColor + " hover:bg-[#f3ecdc]"
          )}
        >
          <LayoutDashboard size={20} />
          {isSidebarOpen && <span className="ml-1">Dashboard</span>}
        </Link>

        {/* User Management */}
        <div>
          <button
            type="button"
            className={cn("flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group hover:bg-[#f3ecdc] transition", sectionLabel)}
            onClick={() => toggleSection("user")}
            aria-expanded={userMgmtOpen}
          >
            <Users size={20} className="text-[#161F33]" />
            {isSidebarOpen && <span>User Management</span>}
            {isSidebarOpen && (userMgmtOpen
              ? <ChevronUp size={18} className="ml-auto" />
              : <ChevronDown size={18} className="ml-auto" />)}
          </button>
          {userMgmtOpen && isSidebarOpen && (
            <div className="ml-6 border-l border-[#e2d1c3] pb-2">
              {userManagementLinks.map(({ label, path, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors",
                    location.pathname === path ? "bg-[#1EAEDB] text-white" : labelColor + " hover:bg-[#f9f5ec]"
                  )}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Management */}
        <div>
          <button
            type="button"
            className={cn("flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group hover:bg-[#f3ecdc] transition", sectionLabel)}
            onClick={() => toggleSection("mgmt")}
            aria-expanded={mgmtOpen}
          >
            <Briefcase size={20} className="text-[#161F33]" />
            {isSidebarOpen && <span>Management</span>}
            {isSidebarOpen && (mgmtOpen
              ? <ChevronUp size={18} className="ml-auto" />
              : <ChevronDown size={18} className="ml-auto" />)}
          </button>
          {mgmtOpen && isSidebarOpen && (
            <div className="ml-6 border-l border-[#e2d1c3] pb-2">
              {managementLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={cn("flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors w-full hover:bg-[#f9f5ec]",
                        location.pathname.startsWith("/cms") ? "bg-[#1EAEDB] text-white" : labelColor)}
                      onClick={() => toggleSection("cms")}
                      aria-expanded={cmsOpen}
                    >
                      {item.icon}
                      <span>CMS</span>
                      {cmsOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
                    </button>
                    {cmsOpen && (
                      <div className="ml-5">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1 rounded-md mb-1 transition-colors",
                              location.pathname === sub.path ? "bg-[#1EAEDB] text-white" : labelColor + " hover:bg-[#f3ecdc]"
                            )}
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors",
                      location.pathname === item.path ? "bg-[#1EAEDB] text-white" : labelColor + " hover:bg-[#f9f5ec]"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="flex-1" />
      {/* User profile + logout */}
      {isSidebarOpen && (
        <div className="mb-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#32346e] to-[#224899] flex items-center justify-center">
            <span className="text-lg font-bold text-white/80">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-[#161F33] truncate">{user?.name || "User"}</p>
            <p className="text-xs text-[#8A898C] truncate">{user?.email || ""}</p>
          </div>
        </div>
      )}
      <button
        className={cn(
          "flex items-center gap-2 w-full justify-start text-[#161F33] hover:bg-[#f3ecdc] rounded-lg px-3 py-2 transition",
          !isSidebarOpen && "justify-center"
        )}
        onClick={logout}
      >
        <svg width="18" height="18" fill="none">
          <path d="M15 3v2a4 4 0 0 1-4 4H5m8-6l3 3m0 0l-3 3m3-3H9" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {isSidebarOpen && <span>Sign out</span>}
      </button>
    </aside>
  );
}
// NOTE: This file is now getting long (over 200 lines). Consider refactoring into smaller components for maintainability.
