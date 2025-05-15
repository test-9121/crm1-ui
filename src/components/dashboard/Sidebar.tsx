import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Users,
  BadgePercent,
  PhoneCall,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Building,
  UserRound,
  Linkedin,
  Target,
  Folder,
  UserCheck,
  Mail,
  FileText,
  Shield,
  PanelLeftOpen
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";
import { RolePermission } from "@/modules/roles/types";

// const sidebarBg = "bg-sidebar";
// const borderCol = "border-r border-sidebar-border";
// const labelColor = "text-sidebar-foreground";
// const iconColor = "text-sidebar-foreground";
// const sectionLabel = "uppercase tracking-wide text-sidebar-accent-foreground text-xs font-semibold mb-2 mt-2";
// const activeGradient = "bg-sidebar-accent text-sidebar-accent-foreground";
// const hoverGradient = "hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground";
// const mobileTriggerBtn = "text-sidebar-foreground hover:bg-sidebar-accent rounded-full flex items-center justify-center p-2 focus:outline-none";

const sidebarBg = "bg-gradient-to-br from-[#151a2b] to-[#232750]";
const borderCol = "border-r border-[#313652]";
const labelColor = "text-gray-200";
const iconColor = "text-white";
const sectionLabel = "uppercase tracking-wide text-[#7bd2fb] text-xs font-semibold mb-2 mt-2";
const activeGradient = "bg-gradient-to-r from-[#1f286c] to-[#1eaedb]";
const hoverGradient = "hover:bg-gradient-to-r hover:from-[#232750] hover:to-[#175e8e]";
const mobileTriggerBtn = "text-white hover:bg-[#22304a] rounded-full flex items-center justify-center p-2 focus:outline-none";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
}

interface SidebarSubItemProps {
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
}

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const SidebarItem = ({ icon, label, path, isCollapsed, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 mx-4 rounded-md transition-all hover-translate",
        isActive
          ? `${activeGradient} text-sidebar-foreground`
          : `text-sidebar-foreground ${hoverGradient}`,
        isCollapsed && "justify-center"
      )}
    >
      <div className={cn("flex-shrink-0", iconColor)}>{icon}</div>
      {!isCollapsed && <span className="animate-fade-in">{label}</span>}
    </Link>
  );
};

const SidebarSubItem = ({ label, path, isCollapsed, isActive }: SidebarSubItemProps) => {
  if (isCollapsed) return null;

  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 ml-9 mx-3 rounded-md transition-all animate-fade-in hover-translate",
        isActive
          ? activeGradient
          : `text-sidebar-foreground/80 ${hoverGradient}`
      )}
    >
      <div className="w-2 h-2 rounded-full bg-sidebar-foreground/30" />
      <span>{label}</span>
    </Link>
  );
};

const SidebarGroup = ({ icon, label, isCollapsed, children }: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-[91%] flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-sidebar-accent/30 text-sidebar-foreground hover:text-sidebar-accent-foreground",
          isCollapsed && "justify-center"
        )}
      >
        <div className="flex-shrink-0">{icon}</div>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "transform rotate-90"
              )}
            />
          </>
        )}
      </button>
      {isOpen && children}
    </div>
  );
};

export function PremiumPlanCard() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "w-full rounded-2xl p-4 mb-4 shadow-lg",
      theme === 'dark' 
        ? "bg-gradient-to-br from-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-[#22304a] to-[#1b233b]"
    )}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-tr from-[#51ffd6] to-[#4948d2] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 3V21" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 12H21" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" />
            <path d="M7.76 7.76L16.24 16.24" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" />
            <path d="M7.76 16.24L16.24 7.76" stroke="#b4baff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-white font-semibold text-base">Premium Plan</div>
          <div className="text-gray-300 text-xs">Active until Jul 2025</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-gray-300 text-xs mb-1 flex justify-between">
          <span>Usage</span>
          <span>78%</span>
        </div>
        <div className="w-full h-2 bg-sidebar-accent/40 rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#4537ff] to-[#457fff]"
            style={{ width: "78%" }}
          />
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Extract user role
  const userRole = user.role.rolePermission || 'ROLE_USER';
  const ownerMail = user.email;
  const isSuperAdmin = userRole === 'ROLE_SUPER_ADMIN';
  const isAdmin = userRole === 'ROLE_ADMIN' || isSuperAdmin;
  const isUser = userRole === 'ROLE_USER';
  const isOwner = ownerMail === 'owner@ensarsolutions.com';

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const SidebarHeader = () => (
    <div className="px-3 py-4 border-sidebar-border/30">
      <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <h1 className="text-lg font-bold text-sidebar-gradient">
              EnsarCRM
            </h1>
          </div>
        )}
        {isCollapsed && (
          <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full p-0 h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent/30"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>
    </div>
  );

  const SidebarContent = () => {
    const dashboardItem = {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    };
  
    // Only show for admin and super admin roles
    const adminManagementItems = [
      { icon: <UserRound size={20} />, label: "Users", path: "/users", showFor: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'] },
      { icon: <Shield size={20} />, label: "Roles", path: "/roles", showFor: ['ROLE_SUPER_ADMIN'] },
    ].filter(item => item.showFor.includes(userRole as RolePermission));
  
    // Add "Organizations" under User Management for the owner email condition
    if (user.email === "owner@ensarsolutions.com") {
      adminManagementItems.push({ icon: <Building size={20} />, label: "Organizations", path: "/organizations",  showFor: ['ROLE_SUPER_ADMIN']});
    }
  
    const managementItems = [
      { icon: <Target size={20} />, label: "Targets", path: "/targets" },
      { icon: <Folder size={20} />, label: "Projects", path: "/projects" },
      { icon: <UserCheck size={20} />, label: "User Tasks", path: "/user-tasks" },
      { icon: <PhoneCall size={20} />, label: "Leads", path: "/leads" },
      { icon: <BadgePercent size={20} />, label: "Deals", path: "/deals" },
      { icon: <Linkedin size={20} />, label: "LinkedIn", path: "/linkedin" },
      { icon: <Calendar size={20} />, label: "Events", path: "/calendar" },
      {
        icon: <FileText size={20} />,
        label: "CMS",
        path: "#",
        subItems: [
          { label: "Content List", path: "/cms/list" },
          { label: "Mail List", path: "/cms-mail/list" },
        ]
      },
      // { icon: <BarChart size={20} />, label: "Reports", path: "/reports" },
      // { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    ];
  
    return (
      <div
        className="space-y-4 py-4 flex-1"
        ref={sidebarRef}
      >
        {!isCollapsed && <PremiumPlanCard />}
        <div className="px-3 animate-fade-in">
          <SidebarItem
            icon={dashboardItem.icon}
            label={dashboardItem.label}
            path={dashboardItem.path}
            isCollapsed={isCollapsed}
            isActive={location.pathname === dashboardItem.path}
          />
        </div>
  
        {/* Only render User Management section if user is admin or super admin */}
        {!isUser && adminManagementItems.length > 0 && (
          <div className="text-[15px]">
            <SidebarGroup icon={<Users size={20} />} label="Admin Management" isCollapsed={isCollapsed}>
              <div className="mt-1 space-y-1 animate-fade-in">
                {adminManagementItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isCollapsed={isCollapsed}
                    isActive={location.pathname === item.path}
                  />
                ))}
              </div>
            </SidebarGroup>
          </div>
        )}
  
        <div>
          <SidebarGroup icon={<PanelLeftOpen size={20} />} label="Management" isCollapsed={isCollapsed}>
            <div className="mt-1 space-y-1 animate-fade-in">
              {managementItems.map((item) => (
                <div key={item.path || item.label}>
                  {item.subItems ? (
                    <>
                      {item.label === "CMS" && (
                        <div className="ml-3">
                          <SidebarGroup icon={<FileText size={20} />} label="CMS" isCollapsed={isCollapsed}>
                            <div className="mt-1 space-y-1 animate-fade-in">
                              {item.subItems.map((subItem) => (
                                <SidebarSubItem
                                  key={subItem.path}
                                  label={subItem.label}
                                  path={subItem.path}
                                  isCollapsed={isCollapsed}
                                  isActive={location.pathname === subItem.path}
                                />
                              ))}
                            </div>
                          </SidebarGroup>
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      path={item.path}
                      isCollapsed={isCollapsed}
                      isActive={location.pathname === item.path}
                    />
                  )}
                </div>
              ))}
            </div>
          </SidebarGroup>
        </div>
      </div>
    );
  };

  const SidebarFooter = () => (
    <div className={cn("p-3 mt-auto", isCollapsed ? "text-center" : "")}>
      {/* {!isCollapsed && (
        <div className="flex items-center gap-3 mb-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{user?.name?.charAt(0) || "U"}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name || "User"}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || ""}</p>
          </div>
        </div>
      )} */}
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground hover-translate",
          isCollapsed && "justify-center"
        )}
        onClick={logout}
      >
        <LogOut size={18} />
        {!isCollapsed && <span>Sign out</span>}
      </Button>
    </div>
  );

  const MobileToggle = () => (
    <Button
      size="icon"
      className={mobileTriggerBtn}
      onClick={toggleMobileSidebar}
    >
      <Menu />
    </Button>
  );

  const renderSidebarContent = () => (
    <>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </>
  );

  if (isMobile) {
    return (
      <>
        <MobileToggle />
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 animate-fade-in" onClick={toggleMobileSidebar} />
        )}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform",
            sidebarBg, borderCol,
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {renderSidebarContent()}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 overflow-y-auto transition-all duration-300 custom-scrollbar",
        sidebarBg, borderCol,
        isCollapsed ? "w-16" : "w-64"
      )}
      ref={sidebarRef}
    >
      {renderSidebarContent()}
    </aside>
  );
}
