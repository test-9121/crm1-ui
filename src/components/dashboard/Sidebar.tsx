
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  // Icons allowed below
  "dashboard" as DashboardIcon,
  "user" as UserIcon,
  "users" as UsersIcon,
  "organization" as OrganizationIcon,
  "role" as RoleIcon,
  "linkedin" as LinkedinIcon,
  "target" as TargetIcon,
  "events" as EventsIcon,
  "lead" as LeadIcon,
  "logout" as LogoutIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sidebar section grouping from image
const sections = [
  {
    header: "User Management",
    items: [
      { id: "user", icon: <UserIcon size={20} />, label: "User", path: "/users" },
      { id: "organization", icon: <OrganizationIcon size={20} />, label: "Organization", path: "/organizations" },
      { id: "role", icon: <UsersIcon size={20} />, label: "Role", path: "/roles" },
    ],
  },
  {
    header: "Management",
    items: [
      { id: "linkedin", icon: <LinkedinIcon size={20} />, label: "LinkedIn", path: "/linkedin", badge: 3 },
      { id: "target", icon: <TargetIcon size={20} />, label: "Target", path: "/targets" },
      { id: "events", icon: <EventsIcon size={20} />, label: "Events", path: "/calendar" },
      { id: "lead", icon: <LeadIcon size={20} />, label: "Lead", path: "/leads" },
    ],
  },
];

const SidebarItem = ({ icon, label, path, isCollapsed, isActive, badge }: any) => (
  <Link
    to={path}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transitioned",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[0_2px_8px_-2px_rgba(36,65,255,0.11)]"
        : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
      isCollapsed && "justify-center px-2"
    )}
    tabIndex={0}
  >
    <span className="relative">
      {icon}
      {badge && (
        <span className="absolute -top-2 -right-1.5 bg-primary text-xs text-white w-5 h-5 flex items-center justify-center rounded-full select-none">
          {badge}
        </span>
      )}
    </span>
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleCollapse = () => setIsCollapsed(val => !val);
  const handleMobileToggle = () => setIsMobileOpen(v => !v);

  // Detect which section is active
  const isItemActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);

  // Colors from logo text in image
  const logoGradient = "bg-gradient-to-r from-[#50FFA3] to-[#00CBFF] text-transparent bg-clip-text";
  const sidebarBG = "bg-sidebar";
  const boxShadow = "shadow-[0_2px_24px_-2px_rgba(36,65,255,0.26)]";

  const sidebarClasses = cn(
    "h-screen sticky top-0 flex flex-col transitioned",
    sidebarBG, boxShadow,
    isCollapsed ? "w-16" : "w-72"
  );

  // Custom brand header
  const BrandHeader = () => (
    <div className={cn(
      "flex items-center justify-between px-4 pt-6 pb-4 transitioned",
      isCollapsed ? "justify-center px-2" : ""
    )}>
      <div className="flex items-center">
        <Icons.logo className="h-7 w-7 text-[#00CBFF] drop-shadow-lg mr-2" />
        {!isCollapsed && (
          <span className={`font-extrabold text-lg ${logoGradient}`}>EnsarCRM</span>
        )}
      </div>
      {/* Close/collapse button */}
      <button
        title={isCollapsed ? "Expand" : "Collapse"}
        className={cn(
          "ml-auto p-1 rounded-full transition transitioned duration-200", 
          "hover:bg-[#232842] hover:text-[#50FFA3]",
          isCollapsed ? "flex justify-center" : ""
        )}
        onClick={handleCollapse}
      >
        {isCollapsed 
          ? <ChevronRight size={20} />
          : <ChevronLeft size={20} />
        }
      </button>
    </div>
  );

  // Premium Plan card based on image, only in expanded view
  const PremiumCard = () =>
    !isCollapsed && (
      <div className="mx-4 mt-2 mb-4 bg-[#22294A] rounded-xl p-4 flex flex-col gap-2 transitioned text-sidebar-foreground shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary shadow flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12.5l2 2 4-4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-sm">Premium Plan</div>
            <div className="text-xs text-sidebar-foreground/70">Active until Jul 2025</div>
          </div>
        </div>
        <div>
          <div className="text-xs mb-1 opacity-80">Usage</div>
          <div className="w-full bg-[#31375C] rounded-full h-2 flex items-center overflow-hidden">
            <div className="bg-primary h-2 rounded-full transitioned" style={{ width: "78%" }} />
          </div>
        </div>
      </div>
    );

  // Section header styling
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mt-5 mb-2 pl-6 text-xs uppercase tracking-wider text-sidebar-foreground/60 font-bold">
      {title}
    </div>
  );

  // Help box from image
  const SupportBox = () =>
    !isCollapsed && (
      <div className="mx-4 mt-6 mb-3 bg-[#232842] rounded-xl py-3 px-4 flex items-center gap-3 transitioned">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M9 9h.01M15 15v-1a3 3 0 1 0-6 0v1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-sm">Need Help?</div>
          <div className="text-xs text-sidebar-foreground/70">Contact support team</div>
        </div>
      </div>
    );

  // Account at bottom
  const AccountBox = () => (
    <div className={cn(
      "p-4 border-t border-sidebar-border mt-auto",
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
          "flex items-center gap-2 w-full justify-start text-sidebar-foreground hover:bg-[#232842] transitioned",
          isCollapsed && "justify-center"
        )}
        onClick={logout}
      >
        <LogoutIcon size={18} />
        {!isCollapsed && <span>Logout</span>}
      </Button>
    </div>
  );

  // main sidebar
  const sidebarContent = (
    <nav className="flex flex-col h-full sidebar-scroll overflow-y-auto transitioned">
      <BrandHeader />
      <PremiumCard />
      <SidebarItem
        icon={<DashboardIcon size={20} />}
        label={"Dashboard"}
        path={"/dashboard"}
        isCollapsed={isCollapsed}
        isActive={location.pathname === "/dashboard"}
      />
      {sections.map(section => (
        <div key={section.header}>
          <SectionHeader title={section.header} />
          {section.items.map(itm => (
            <SidebarItem
              key={itm.id}
              icon={itm.icon}
              label={itm.label}
              path={itm.path}
              isCollapsed={isCollapsed}
              isActive={isItemActive(itm.path)}
              badge={itm.badge}
            />
          ))}
        </div>
      ))}
      <SupportBox />
      <AccountBox />
    </nav>
  );

  // For mobile small screens
  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 bg-sidebar-accent text-white rounded-full p-2 shadow-lg transitioned"
          onClick={handleMobileToggle}
          aria-label="Open menu"
        >
          <ChevronRight size={24} />
        </button>
        {/* Mobile overlay */}
        {isMobileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40" onClick={handleMobileToggle}/>
            <aside className={cn(
              "fixed top-0 left-0 z-50 w-64 h-screen transitioned",
              "bg-sidebar shadow-lg"
            )}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 pt-6 pb-4">
                  <div className="flex items-center gap-1">
                    <Icons.logo className="h-7 w-7 text-[#00CBFF]" />
                    <span className={`font-extrabold text-lg ${logoGradient}`}>EnsarCRM</span>
                  </div>
                  <button className="p-1 bg-transparent rounded-full hover:bg-[#232842] transitioned" onClick={handleMobileToggle}>
                    <ChevronLeft size={22} />
                  </button>
                </div>
                {sidebarContent}
              </div>
            </aside>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className={sidebarClasses}>
      {sidebarContent}
    </aside>
  );
}
