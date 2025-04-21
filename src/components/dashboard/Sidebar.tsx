
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
  Folder,
  ClipboardList,
  BookOpen,
  Linkedin,
  Calendar,
  FileText,
  FileCog,
  Mail,
  Store,
  BarChart,
  Settings,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Menu,
  X,
  ArrowLeft,
  ArrowRight
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
  { label: "Projects", path: "/projects", icon: <Folder size={20} /> },
  { label: "User Tasks", path: "/user-tasks", icon: <ClipboardList size={20} /> },
  { label: "Leads", path: "/leads", icon: <BookOpen size={20} /> },
  { label: "LinkedIn", path: "/linkedin", icon: <Linkedin size={20} /> },
  {
    label: "CMS",
    icon: <FileText size={20} />,
    children: [
      { label: "Events", path: "/calendar", icon: <Calendar size={20} /> },
      { label: "Content List", path: "/cms/list", icon: <FileCog size={20} /> },
      { label: "Mail List", path: "/cms-mail/list", icon: <Mail size={20} /> },
    ],
  },
  { label: "Deals", path: "/deals", icon: <Store size={20} /> },
  { label: "Reports", path: "/reports", icon: <BarChart size={20} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  const [mgmtOpen, setMgmtOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(false);

  // Color scheme for new dark sidebar & highlights
  const sidebarBg = "bg-gradient-to-br from-[#151a2b] to-[#232750]";
  const borderCol = "border-r border-[#313652]";
  const labelColor = "text-gray-200";
  const iconColor = "text-white";
  const sectionLabel = "uppercase tracking-wide text-[#7bd2fb] text-xs font-semibold mb-2 mt-2";
  const activeGradient = "bg-gradient-to-r from-[#1f286c] to-[#1eaedb]";
  const hoverGradient = "hover:bg-gradient-to-r hover:from-[#232750] hover:to-[#175e8e]";
  const mobileTriggerBtn =
    "text-white hover:bg-[#22304a] rounded-full flex items-center justify-center p-2 focus:outline-none";

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  // Accordion toggles
  const toggleSection = (type: "user" | "mgmt" | "cms") => {
    if (type === "user") setUserMgmtOpen((o) => !o);
    if (type === "mgmt") setMgmtOpen((o) => !o);
    if (type === "cms") setCmsOpen((o) => !o);
  };

  // Mobile Sidebar Overlay
  const mobileSidebar = (
    <div
      className={cn(
        "fixed inset-0 z-40 flex",
        isMobileSidebarOpen ? "visible" : "hidden"
      )}
      style={{ background: "rgba(22,31,51, 0.7)" }}
    >
      <aside
        className={cn(
          "relative flex flex-col h-full w-64 px-5 py-6",
          sidebarBg,
          borderCol,
          "transition-all duration-300"
        )}
        style={{ minWidth: "16rem" }}
      >
        {/* Heading and mobile close/collapse icon */}
        <div className="flex items-center mb-5 h-10">
          <span
            className="text-2xl font-extrabold text-white"
            style={{
              background: "linear-gradient(90deg, #4effa2 0%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
            Ensar
          </span>
          <span
            className="text-2xl font-extrabold"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #203fa1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: 2
            }}>
            CRM
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className={mobileTriggerBtn + " ml-auto"}
            aria-label="Close sidebar"
          >
            <X size={26} />
          </button>
        </div>
        {/* Collapse/expand for mobile */}
        <button
          onClick={toggleSidebar}
          className={cn(mobileTriggerBtn, "mb-4")}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
        </button>
        {/* Premium Card */}
        {isSidebarOpen && <PremiumCard />}

        {/* Main navigation */}
        <nav className="mb-3 mt-2">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium mb-2 transition",
              location.pathname === "/dashboard"
                ? activeGradient + " text-white"
                : iconColor + " " + hoverGradient
            )}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span className="ml-1">Dashboard</span>}
          </Link>

          {/* User Management */}
          <div>
            <button
              type="button"
              className={cn(
                "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group transition",
                sectionLabel,
                hoverGradient
              )}
              onClick={() => toggleSection("user")}
              aria-expanded={userMgmtOpen}
            >
              <Users size={20} className={iconColor} />
              {isSidebarOpen && <span>User Management</span>}
              {isSidebarOpen &&
                (userMgmtOpen ? (
                  <ChevronUp size={18} className="ml-auto" />
                ) : (
                  <ChevronDown size={18} className="ml-auto" />
                ))}
            </button>
            {userMgmtOpen && isSidebarOpen && (
              <div className="ml-6 border-l border-[#2d3550] pb-2">
                {userManagementLinks.map(({ label, path, icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors",
                      location.pathname === path
                        ? activeGradient + " text-white"
                        : labelColor + " " + hoverGradient
                    )}
                    onClick={() => setIsMobileSidebarOpen(false)}
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
              className={cn(
                "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group transition",
                sectionLabel,
                hoverGradient
              )}
              onClick={() => toggleSection("mgmt")}
              aria-expanded={mgmtOpen}
            >
              <Briefcase size={20} className={iconColor} />
              {isSidebarOpen && <span>Management</span>}
              {isSidebarOpen &&
                (mgmtOpen ? (
                  <ChevronUp size={18} className="ml-auto" />
                ) : (
                  <ChevronDown size={18} className="ml-auto" />
                ))}
            </button>
            {mgmtOpen && isSidebarOpen && (
              <div className="ml-6 border-l border-[#2d3550] pb-2">
                {managementLinks.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors w-full",
                          location.pathname.startsWith("/cms")
                            ? activeGradient + " text-white"
                            : labelColor + " " + hoverGradient
                        )}
                        onClick={() => toggleSection("cms")}
                        aria-expanded={cmsOpen}
                      >
                        {item.icon}
                        <span>CMS</span>
                        {cmsOpen ? (
                          <ChevronUp size={16} className="ml-auto" />
                        ) : (
                          <ChevronDown size={16} className="ml-auto" />
                        )}
                      </button>
                      {cmsOpen && (
                        <div className="ml-5">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={cn(
                                "flex items-center gap-2 px-2 py-1 rounded-md mb-1 transition-colors",
                                location.pathname === sub.path
                                  ? activeGradient + " text-white"
                                  : labelColor + " " + hoverGradient
                              )}
                              onClick={() => setIsMobileSidebarOpen(false)}
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
                        location.pathname === item.path
                          ? activeGradient + " text-white"
                          : labelColor + " " + hoverGradient
                      )}
                      onClick={() => setIsMobileSidebarOpen(false)}
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
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-[#d2e8fc] truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        )}
        <button
          className={cn(
            "flex items-center gap-2 w-full justify-start text-white hover:bg-[#232750] rounded-lg px-3 py-2 transition"
          )}
          onClick={logout}
        >
          <svg width="18" height="18" fill="none">
            <path d="M15 3v2a4 4 0 0 1-4 4H5m8-6l3 3m0 0l-3 3m3-3H9" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isSidebarOpen && <span>Sign out</span>}
        </button>
      </aside>
      {/* Click-out area */}
      <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
    </div>
  );

  // Desktop sidebar (persistent)
  const desktopSidebar = (
    <aside
      className={cn(
        "flex flex-col",
        sidebarBg,
        borderCol,
        "h-screen w-64 px-5 py-6 relative transition-all duration-300",
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
        {/* Collapse icon (only show on desktop) */}
        <button
          onClick={toggleSidebar}
          className="ml-auto text-white bg-[#283156] hover:bg-[#1eaedb] rounded-full flex items-center justify-center p-1 transition"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
        </button>
        {/* Mobile menu icon (hidden on desktop, shown on mobile below) */}
      </div>
      {/* Premium Card */}
      {isSidebarOpen && <PremiumCard />}

      {/* Main navigation */}
      <nav className="mb-3 mt-2">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg font-medium mb-2 transition",
            location.pathname === "/dashboard"
              ? activeGradient + " text-white"
              : iconColor + " " + hoverGradient
          )}
        >
          <LayoutDashboard size={20} />
          {isSidebarOpen && <span className="ml-1">Dashboard</span>}
        </Link>

        {/* User Management */}
        <div>
          <button
            type="button"
            className={cn(
              "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group transition",
              sectionLabel,
              hoverGradient
            )}
            onClick={() => toggleSection("user")}
            aria-expanded={userMgmtOpen}
          >
            <Users size={20} className={iconColor} />
            {isSidebarOpen && <span>User Management</span>}
            {isSidebarOpen &&
              (userMgmtOpen ? (
                <ChevronUp size={18} className="ml-auto" />
              ) : (
                <ChevronDown size={18} className="ml-auto" />
              ))}
          </button>
          {userMgmtOpen && isSidebarOpen && (
            <div className="ml-6 border-l border-[#2d3550] pb-2">
              {userManagementLinks.map(({ label, path, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors",
                    location.pathname === path
                      ? activeGradient + " text-white"
                      : labelColor + " " + hoverGradient
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
            className={cn(
              "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-semibold text-base group transition",
              sectionLabel,
              hoverGradient
            )}
            onClick={() => toggleSection("mgmt")}
            aria-expanded={mgmtOpen}
          >
            <Briefcase size={20} className={iconColor} />
            {isSidebarOpen && <span>Management</span>}
            {isSidebarOpen &&
              (mgmtOpen ? (
                <ChevronUp size={18} className="ml-auto" />
              ) : (
                <ChevronDown size={18} className="ml-auto" />
              ))}
          </button>
          {mgmtOpen && isSidebarOpen && (
            <div className="ml-6 border-l border-[#2d3550] pb-2">
              {managementLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-3 px-2 py-1 rounded-md mb-1 transition-colors w-full",
                        location.pathname.startsWith("/cms")
                          ? activeGradient + " text-white"
                          : labelColor + " " + hoverGradient
                      )}
                      onClick={() => toggleSection("cms")}
                      aria-expanded={cmsOpen}
                    >
                      {item.icon}
                      <span>CMS</span>
                      {cmsOpen ? (
                        <ChevronUp size={16} className="ml-auto" />
                      ) : (
                        <ChevronDown size={16} className="ml-auto" />
                      )}
                    </button>
                    {cmsOpen && (
                      <div className="ml-5">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1 rounded-md mb-1 transition-colors",
                              location.pathname === sub.path
                                ? activeGradient + " text-white"
                                : labelColor + " " + hoverGradient
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
                      location.pathname === item.path
                        ? activeGradient + " text-white"
                        : labelColor + " " + hoverGradient
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
            <p className="text-xs font-semibold text-white truncate">{user?.name || "User"}</p>
            <p className="text-xs text-[#d2e8fc] truncate">{user?.email || ""}</p>
          </div>
        </div>
      )}
      <button
        className={cn(
          "flex items-center gap-2 w-full justify-start text-white hover:bg-[#232750] rounded-lg px-3 py-2 transition",
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

  return (
    <>
      {isMobile
        ? (isMobileSidebarOpen ? (
            mobileSidebar
          ) : (
            // Only show mobile menu icon on mobile, sidebar is closed by default
            <div className="fixed top-3 left-3 z-50 md:hidden">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="text-white bg-[#232750] hover:bg-[#3855a2] rounded-full flex items-center justify-center p-2 shadow-md"
                aria-label="Open sidebar"
              >
                <Menu size={26} />
              </button>
            </div>
          ))
        : desktopSidebar}
    </>
  );
}
// NOTE: This file is over 200 lines. Consider asking for a refactor into smaller components for maintainability.

