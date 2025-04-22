
import { useState } from "react";
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
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover-translate",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center"
      )}
    >
      <div className="flex-shrink-0 text-sidebar-foreground">
        {icon}
      </div>
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
        "flex items-center gap-3 px-3 py-2 ml-9 rounded-md transition-all animate-fade-in hover-translate",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground"
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
          "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-sidebar-accent/30 text-sidebar-foreground hover:text-sidebar-accent-foreground",
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

// Premium Plan card component
const PremiumPlanCard = ({ isCollapsed }: { isCollapsed: boolean }) => {
  if (isCollapsed) return null;
  
  return (
    <div className="mx-3 my-4 p-3 rounded-lg gradient-premium animate-fade-in animate-scale hover-glow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-white">Premium Plan</h3>
        <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded">PRO</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-white/80 mb-1">
            <span>Usage</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="h-1.5 bg-white/20" indicatorClassName="bg-white" />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white hover-translate"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Sidebar header with app logo and name
  const SidebarHeader = () => (
    <div className="px-3 py-4 border-b border-sidebar-border/30">
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <h1 className="text-lg font-bold text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
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

  // Sidebar content with navigation items
  const SidebarContent = () => {
    // Group items by category
    const dashboardItem = {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    };
    
    const userManagementItems = [
      { icon: <UserRound size={20} />, label: "Users", path: "/users" },
      { icon: <Building size={20} />, label: "Organizations", path: "/organizations" },
      { icon: <Shield size={20} />, label: "Roles", path: "/roles" },
    ];
    
    const managementItems = [
      { icon: <Target size={20} />, label: "Targets", path: "/targets" },
      { icon: <Folder size={20} />, label: "Projects", path: "/projects" },
      { icon: <UserCheck size={20} />, label: "User Tasks", path: "/user-tasks" },
      { icon: <PhoneCall size={20} />, label: "Leads", path: "/leads" },
      { icon: <Linkedin size={20} />, label: "LinkedIn", path: "/linkedin" },
      { icon: <Calendar size={20} />, label: "Events", path: "/calendar" },
      { icon: <FileText size={20} />, label: "CMS", path: "#", subItems: [
        { label: "Content List", path: "/cms/list" },
        { label: "Mail List", path: "/cms-mail/list" }
      ]},
      { icon: <BadgePercent size={20} />, label: "Deals", path: "/deals" },
      { icon: <BarChart size={20} />, label: "Reports", path: "/reports" },
      { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    ];

    return (
      <div className="space-y-4 py-4 flex-1 overflow-y-auto custom-scrollbar">
        {/* Dashboard section - standalone */}
        <div className="px-3 animate-fade-in">
          <SidebarItem
            icon={dashboardItem.icon}
            label={dashboardItem.label}
            path={dashboardItem.path}
            isCollapsed={isCollapsed}
            isActive={location.pathname === dashboardItem.path}
          />
        </div>
        
        {/* Premium plan card */}
        <PremiumPlanCard isCollapsed={isCollapsed} />
        
        {/* User Management section */}
        <div>
          <SidebarGroup 
            icon={<Users size={20} />}
            label="User Management"
            isCollapsed={isCollapsed}
          >
            <div className="mt-1 space-y-1 animate-fade-in">
              {userManagementItems.map((item) => (
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
        
        {/* Management section */}
        <div>
          <SidebarGroup 
            icon={<PanelLeftOpen size={20} />}
            label="Management"
            isCollapsed={isCollapsed}
          >
            <div className="mt-1 space-y-1 animate-fade-in">
              {managementItems.map((item) => (
                <div key={item.path || item.label}>
                  {item.subItems ? (
                    <>
                      <div 
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer hover-translate",
                          location.pathname.includes("/cms")
                            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground",
                          isCollapsed && "justify-center"
                        )}
                      >
                        <div className="flex-shrink-0 text-sidebar-foreground">
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className="flex-1">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && item.subItems.map((subItem) => (
                        <SidebarSubItem
                          key={subItem.path}
                          label={subItem.label}
                          path={subItem.path}
                          isCollapsed={isCollapsed}
                          isActive={location.pathname === subItem.path}
                        />
                      ))}
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

  // Sidebar footer with user info and logout button
  const SidebarFooter = () => (
    <div className={cn(
      "p-3 border-t border-sidebar-border/30 mt-auto",
      isCollapsed ? "text-center" : ""
    )}>
      {!isCollapsed && (
        <div className="flex items-center gap-3 mb-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || ""}</p>
          </div>
        </div>
      )}
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-white hover-translate",
          isCollapsed && "justify-center"
        )}
        onClick={logout}
      >
        <LogOut size={18} />
        {!isCollapsed && <span>Sign out</span>}
      </Button>
    </div>
  );

  // Mobile sidebar toggle button
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 animate-fade-in hover-translate"
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
        {/* Mobile sidebar - overlay style */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 animate-fade-in" onClick={toggleMobileSidebar} />
        )}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300 transform",
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
        "bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto transition-all duration-300 custom-scrollbar",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {renderSidebarContent()}
    </aside>
  );
}
