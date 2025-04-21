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
  LogIn
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const crmLogoSrc = "/lovable-uploads/9a50d12c-d138-4337-8512-dcba4e3aad26.png";

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

const sidebarBg = "bg-[#131c36] bg-gradient-to-br from-[#131c36] to-[#22304a]";
const borderCol = "border-r border-[#254073]";
const labelColor = "text-gray-200";
const iconColor = "text-white";
const sectionLabel = "uppercase tracking-wide text-[#33C3F0] text-xs font-bold mb-2 mt-2";
const activeGradient = "bg-gradient-to-r from-[#162c63] to-[#1eaedb]";
const hoverGradient = "hover:bg-[rgba(30,174,219,0.12)]";
const collapseBtn =
  "ml-2 rounded-full bg-[#213d5b] hover:bg-[#1eaedb] transition-colors text-white flex items-center justify-center p-1";
const crmLogoBg = "rounded-full bg-gradient-to-tr from-[#1EAEDB] to-[#22304a] shadow-md p-0.5";
const collapsedSidebarWidth = "w-16 min-w-[4rem] max-w-[4rem] px-2";
const expandedSidebarWidth = "w-64 px-4 min-w-[16rem]";
const menuIconSize = 22;

function SidebarIconLink({ to, icon, active, label }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-center my-2 rounded-lg group transition relative hover:scale-105 duration-100",
        active
          ? activeGradient + " " + iconColor + " shadow-lg"
          : hoverGradient + " " + iconColor
      )}
      style={{ minHeight: 44, minWidth: 44 }}
    >
      <span className={cn("flex items-center justify-center", iconColor)}>
        {icon}
        <span className="sr-only">{label}</span>
      </span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  const [mgmtOpen, setMgmtOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(false);

  const handleSidebarToggle = () => setIsSidebarOpen((o) => !o);
  const handleMobileSidebarToggle = () => setIsMobileSidebarOpen((o) => !o);

  const collapsedMenuIcons = [
    { to: "/dashboard", icon: <LayoutDashboard size={menuIconSize} />, label: "Dashboard" },
    ...userManagementLinks.map((item) => ({
      to: item.path,
      icon: item.icon,
      label: item.label,
    })),
    ...managementLinks.flatMap((item) =>
      item.children
        ? item.children.map((sub) => ({
            to: sub.path,
            icon: sub.icon,
            label: sub.label,
          }))
        : [{ to: item.path, icon: item.icon, label: item.label }]
    ),
  ];

  function CRMLogoCollapseBar({ collapsed, onToggle }) {
    return (
      <div className={cn(
        "flex items-center gap-2 py-3",
        collapsed ? "justify-between px-1" : "mb-5 px-0"
      )}>
        <img src={crmLogoSrc} alt="CRM Logo" className="w-9 h-9 rounded-full bg-white/20" />
        {!collapsed && (
          <>
            <span
              className="text-2xl font-extrabold text-white ml-2"
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
          </>
        )}
        <button
          onClick={onToggle}
          className={cn(
            collapseBtn,
            collapsed ? "ml-0" : "ml-auto",
            "transition-all duration-150"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ArrowLeft
            size={22}
            className={cn(
              "transition-all duration-150",
              collapsed ? "rotate-180" : ""
            )}
          />
        </button>
      </div>
    );
  }

  const scrollableMenuClass = "overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#1b2940]";

  if (!isSidebarOpen && !isMobile) {
    return (
      <aside
        className={cn(
          "flex flex-col relative transition-all duration-300 h-screen",
          sidebarBg,
          borderCol,
          collapsedSidebarWidth
        )}
        style={{ minWidth: "4rem", width: "4rem", maxWidth: "4rem" }}
      >
        <CRMLogoCollapseBar collapsed={true} onToggle={handleSidebarToggle} />
        <nav className={cn("flex flex-col items-center gap-1", scrollableMenuClass)}>
          {collapsedMenuIcons.map((item) => (
            <SidebarIconLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              active={location.pathname === item.to}
              label={item.label}
            />
          ))}
        </nav>
        <div className="flex-1" />
        <button
          className="flex items-center justify-center w-full text-white hover:bg-[#232750] rounded-lg p-2 mb-3 mt-auto"
          onClick={logout}
        >
          <svg width="18" height="18" fill="none">
            <path d="M15 3v2a4 4 0 0 1-4 4H5m8-6l3 3m0 0l-3 3m3-3H9" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <>
      {isMobile && !isMobileSidebarOpen && (
        <div className="fixed top-3 left-3 z-50 md:hidden">
          <button
            onClick={handleMobileSidebarToggle}
            className="text-white bg-[#232750] hover:bg-[#3855a2] rounded-full flex items-center justify-center p-2 shadow-md"
            aria-label="Open sidebar"
          >
            <Menu size={26} />
          </button>
        </div>
      )}

      {(isMobile && isMobileSidebarOpen) || !isMobile ? (
        <aside
          className={cn(
            "flex flex-col h-screen relative transition-all duration-300",
            sidebarBg,
            borderCol,
            expandedSidebarWidth
          )}
          style={{
            minWidth: isSidebarOpen ? "16rem" : "4rem",
            width: isSidebarOpen ? "16rem" : "4rem"
          }}
        >
          <CRMLogoCollapseBar
            collapsed={isMobile}
            onToggle={isMobile ? handleMobileSidebarToggle : handleSidebarToggle}
          />
          {(!isMobile || isMobileSidebarOpen) && (
            <div className={scrollableMenuClass}>
              <nav className="mb-3 mt-2">
                <Link
                  to="/dashboard"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg font-semibold mb-2 transition hover-scale",
                    location.pathname === "/dashboard"
                      ? activeGradient + " text-white"
                      : iconColor + " " + hoverGradient
                  )}
                >
                  <LayoutDashboard size={20} />
                  <span className="ml-1">Dashboard</span>
                </Link>
                <div>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-bold group transition",
                      sectionLabel,
                      hoverGradient
                    )}
                    onClick={() => setUserMgmtOpen((o) => !o)}
                    aria-expanded={userMgmtOpen}
                  >
                    <Users size={20} className={iconColor} />
                    <span>User Management</span>
                    {userMgmtOpen ? (
                      <ChevronUp size={18} className="ml-auto" />
                    ) : (
                      <ChevronDown size={18} className="ml-auto" />
                    )}
                  </button>
                  {userMgmtOpen && (
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
                <div>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center w-full gap-2 px-2 py-1 rounded-md mb-1 font-bold group transition",
                      sectionLabel,
                      hoverGradient
                    )}
                    onClick={() => setMgmtOpen((o) => !o)}
                    aria-expanded={mgmtOpen}
                  >
                    <Briefcase size={20} className={iconColor} />
                    <span>Management</span>
                    {mgmtOpen ? (
                      <ChevronUp size={18} className="ml-auto" />
                    ) : (
                      <ChevronDown size={18} className="ml-auto" />
                    )}
                  </button>
                  {mgmtOpen && (
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
                              onClick={() => setCmsOpen((o) => !o)}
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
              <button
                className="flex items-center gap-2 w-full justify-start text-white hover:bg-[#232750] rounded-lg px-3 py-2 transition mb-2"
                onClick={logout}
              >
                <svg width="18" height="18" fill="none">
                  <path d="M15 3v2a4 4 0 0 1-4 4H5m8-6l3 3m0 0l-3 3m3-3H9" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          )}
        </aside>
      ) : null}

      {isMobileSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(19,28,54, 0.7)" }}
          onClick={handleMobileSidebarToggle}
        ></div>
      )}
    </>
  );
}
