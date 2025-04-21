import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
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
  Lock
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

const SidebarItem = ({ icon, label, path, isCollapsed, isActive }: SidebarItemProps) => {
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const SidebarSubItem = ({ label, path, isCollapsed, isActive }: SidebarSubItemProps) => {
  if (isCollapsed) return null;
  
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 ml-6 rounded-md transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const PremiumCard = () => (
  <div className="premium-card-premium-ui">
    <div className="premium-badge font-semibold flex items-center gap-2">
      <svg width="28" height="28" fill="none" className="mr-2">
        <defs>
          <linearGradient id="premiumGoldGradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE29F" />
            <stop offset="1" stopColor="#FF719A" />
          </linearGradient>
        </defs>
        <circle cx="14" cy="14" r="14" fill="url(#premiumGoldGradient)" />
        {/* Lucide "star" icon used for premium */}
        <g>
          <path d="m14 4.5 2.4 6.03 6.6.4-5.16 4.38 1.62 5.68L14 16.99l-5.46 3.02 1.62-5.68L5 10.93l6.6-.4L14 4.5Z" stroke="#fff" strokeWidth="1.2" fill="#fff8" />
        </g>
      </svg>
      <span>Premium Plan</span>
    </div>
    <div className="text-xs mt-1 opacity-90">Active until Jul 2025</div>
    <div className="premium-usage-bar-bg mt-2">
      <div className="premium-usage-bar" style={{ width: '78%', background: 'linear-gradient(90deg,#ffe29f 0%,#ff719a 100%)', boxShadow: '0 0 8px #fbbf24cc,0 2px 12px 0 #eab30822' }} />
    </div>
    <div className="premium-usage-label text-[13px]">Usage <span className="font-semibold">78%</span></div>
  </div>
);

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['cms']);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const sidebarItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { id: "users", icon: <UserRound size={20} />, label: "Users", path: "/users" },
    { id: "roles", icon: <Users size={20} />, label: "Roles", path: "/roles" },
    { id: "targets", icon: <Target size={20} />, label: "Targets", path: "/targets" },
    { id: "projects", icon: <Folder size={20} />, label: "Projects", path: "/projects" },
    { id: "user-tasks", icon: <UserCheck size={20} />, label: "User Tasks", path: "/user-tasks" },
    { id: "leads", icon: <PhoneCall size={20} />, label: "Leads", path: "/leads" },
    { id: "organizations", icon: <Building size={20} />, label: "Organizations", path: "/organizations" },
    { id: "linkedin", icon: <Linkedin size={20} />, label: "LinkedIn", path: "/linkedin" },
    { id: "events", icon: <Calendar size={20} />, label: "Events", path: "/calendar" },
    { 
      id: "cms", 
      icon: <FileText size={20} />, 
      label: "CMS", 
      path: "#", 
      hasSubItems: true,
      subItems: [
        { label: "Content List", path: "/cms/list" },
        { label: "Mail List", path: "/cms-mail/list" }
      ]
    },
    { id: "deals", icon: <BadgePercent size={20} />, label: "Deals", path: "/deals" },
    { id: "reports", icon: <BarChart size={20} />, label: "Reports", path: "/reports" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const renderSidebarContent = () => (
    <>
      <div className="px-3 pt-5 pb-3 sidebar-glow">
        {/* Move premium card below Ensar CRM title/logo */}
        <div className="mb-4">{/* SIDEBAR LOGO/TITLE */} 
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tighter" style={{ color: "#34faa2" }}>Ensar</span>
                <span className="text-2xl font-extrabold tracking-tighter text-white">CRM</span>
              </div>
            )}
            {isCollapsed && (
              <span className="text-2xl font-extrabold tracking-tighter" style={{ color: "#34faa2" }}>E</span>
            )}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="rounded-full p-0 h-8 w-8 text-sidebar-foreground"
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </Button>
            )}
          </div>
        </div>
        <PremiumCard />
      </div>
      {/* Remove old PremiumCard (if double), and move rest of sidebar up */}
      <div className="space-y-1 px-3 py-2 flex-1">
        {sidebarItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            {item.hasSubItems ? (
              <>
                <div 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer",
                    location.pathname.includes(item.id.toLowerCase())
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    isCollapsed && "justify-center"
                  )}
                  onClick={() => !isCollapsed && toggleItemExpansion(item.id)}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight 
                        size={16} 
                        className={cn(
                          "transition-transform",
                          expandedItems.includes(item.id) && "transform rotate-90"
                        )}
                      />
                    </>
                  )}
                </div>
                {!isCollapsed && expandedItems.includes(item.id) && (
                  <div className="mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <SidebarSubItem
                        key={subItem.path}
                        label={subItem.label}
                        path={subItem.path}
                        isCollapsed={isCollapsed}
                        isActive={location.pathname === subItem.path}
                      />
                    ))}
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

      <div className={cn(
        "p-3 border-t border-sidebar-border mt-auto",
        isCollapsed ? "text-center" : ""
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || ""}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 w-full justify-start text-sidebar-foreground",
            isCollapsed && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Sign out</span>}
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <MobileToggle />
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleMobileSidebar} />
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
        "bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {renderSidebarContent()}
    </aside>
  );
}
