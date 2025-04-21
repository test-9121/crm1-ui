
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  User,
  Organization,
  Role,
  Linkedin,
  Target,
  Events,
  Lead,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Sidebar colors
const SIDEBAR_BG = "bg-gradient-to-b from-[#181f32] via-[#181b28] to-[#111522]";
const SIDEBAR_CARD_BG = "bg-[#1C2236]";
const SIDEBAR_ACCENT = "text-[#4A95F7]";
const SIDEBAR_TITLE = "text-[#7EE38B] font-bold";
const SIDEBAR_TITLE_ACCENT = "text-[#5D5FDB] font-bold";
const SIDEBAR_ICON = "text-white";
const SIDEBAR_GROUP_LABEL = "uppercase tracking-wide text-xs text-[#D0D8F6] font-semibold mb-1 mt-4";
const SIDEBAR_MENU = "flex items-center gap-3 py-2 px-3 rounded-lg transition-all hover:bg-[#222a41]";
const SIDEBAR_MENU_ACTIVE = "bg-[#404C8C] text-white";
const SIDEBAR_MENU_LABEL = "font-medium text-white text-[16px] leading-none";
const SIDEBAR_MENU_INACTIVE_ICON = "text-[#B0BADB]";
const SIDEBAR_LOGOUT = "text-[#B0BADB] hover:bg-[#181f32] hover:text-white";
const SIDEBAR_BADGE = "bg-[#4A64F7] text-white text-xs font-semibold px-2 py-0.5 rounded-full ml-2";
const SIDEBAR_SECTION_DIVIDER = "w-full h-px bg-[#232944] my-2";

// Premium plan card and Help card styling
const SIDEBAR_CARD = "rounded-2xl px-4 py-4 flex flex-col gap-2 shadow-sm";
const SIDEBAR_USAGE_BAR_BG = "bg-[#242D51]";
const SIDEBAR_USAGE_BAR = "bg-gradient-to-r from-[#5285F6] to-[#7563F7]";
const SIDEBAR_HELP_CARD_BG = "bg-[#1C2236]";
const SIDEBAR_HELP_ICON_BG = "bg-[#252D47] rounded-full flex items-center justify-center w-8 h-8";

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Structure menu as in the screenshot
  const menu = [
    {
      group: null,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          path: "/dashboard",
          key: "dashboard"
        }
      ]
    },
    {
      group: "User Management",
      items: [
        { label: "User", icon: User, path: "/users", key: "user" },
        { label: "Organization", icon: Organization, path: "/organizations", key: "organization" },
        { label: "Role", icon: Role, path: "/roles", key: "role" }
      ]
    },
    {
      group: "Management",
      items: [
        {
          label: "LinkedIn",
          icon: Linkedin,
          path: "/linkedin",
          key: "linkedin",
          badge: 3 // Example badge
        },
        {
          label: "Target",
          icon: Target,
          path: "/targets",
          key: "target",
          isPremium: true
        },
        {
          label: "Events",
          icon: Events,
          path: "/calendar",
          key: "events"
        },
        {
          label: "Lead",
          icon: Lead,
          path: "/leads",
          key: "lead"
        }
      ]
    }
  ];

  // Mobile sidebar toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50"
      onClick={() => setIsMobileOpen((o) => !o)}
    >
      <svg width={24} height={24} fill="none" stroke="#fff" strokeWidth="2"><rect width="20" height="2" x="2" y="5" rx="1" /><rect width="20" height="2" x="2" y="11" rx="1" /><rect width="20" height="2" x="2" y="17" rx="1" /></svg>
    </Button>
  );

  const sidebarContent = (
    <div className={cn("flex flex-col h-full w-full", SIDEBAR_BG)}>
      {/* Header: Brand and close on mobile */}
      <div className="px-5 pt-7 pb-1 flex items-center gap-2 justify-between">
        <div className="flex-1 flex gap-1 items-center text-[1.6rem] font-bold">
          <span className={SIDEBAR_TITLE}>Ensar</span>
          <span className={SIDEBAR_TITLE_ACCENT}>CRM</span>
        </div>
        {/* Collapse for desktop, close for mobile */}
        {!isMobile ? null : (
          <Button size="icon" variant="ghost" onClick={() => setIsMobileOpen(false)}>
            <svg width={18} height={18} fill="none" stroke="#fff" strokeWidth="3"><path d="M4 4l10 10M4 14L14 4" /></svg>
          </Button>
        )}
      </div>

      {/* Premium card */}
      <div className={cn(SIDEBAR_CARD_BG, SIDEBAR_CARD, "mt-2 mx-3 mb-5")}>
        <div className="flex gap-3 items-center">
          <span className="bg-gradient-to-br from-[#6698FF] to-[#8A72F7] w-11 h-11 rounded-full flex items-center justify-center">
            {/* Sparkle/star icon */}
            <svg width={28} height={28} viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="none"/><path d="M14 7v5m0 0l2.22 1.3m-2.22-1.3l-2.22 1.3m2.22-1.3v7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="14" cy="17" r="1" fill="#fff"/></svg>
          </span>
          <div>
            <div className="text-white font-semibold">Premium Plan</div>
            <div className="text-xs text-[#B0BADB] mt-0.5">Active until Jul 2025</div>
          </div>
        </div>
        <div className="pt-2 text-sm flex justify-between items-center text-[#B0BADB]">
          <span>Usage</span>
          <span className="font-semibold text-[#D1D7FF]">78%</span>
        </div>
        <div className={cn(SIDEBAR_USAGE_BAR_BG, "w-full rounded-lg h-2 mt-1 relative")}>
          <div className={SIDEBAR_USAGE_BAR + " absolute top-0 left-0 h-2 rounded-lg"} style={{ width: "78%" }} />
        </div>
      </div>
      
      {/* Sections */}
      <nav className="flex-1 flex flex-col gap-0 mt-2">
        {menu.map((section, idx) => (
          <div key={idx}>
            {section.group && (
              <div className={SIDEBAR_GROUP_LABEL}>{section.group}</div>
            )}
            <ul>
              {section.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <li key={item.key} className="relative">
                    <Link
                      to={item.path}
                      className={cn(
                        SIDEBAR_MENU,
                        isActive ? SIDEBAR_MENU_ACTIVE : "text-white",
                        isActive && item.isPremium ? "bg-gradient-to-r from-[#536BEB] to-[#4A95F7]" : "",
                        "gap-3 my-1"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-white" : SIDEBAR_MENU_INACTIVE_ICON)} />
                      <span className={SIDEBAR_MENU_LABEL}>{item.label}</span>
                      {item.badge && (
                        <span className={SIDEBAR_BADGE}>{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Divider after User/Management group */}
            {section.group === "Role" || (section.group === "Management" && idx !== menu.length - 1) ? (
              <div className={SIDEBAR_SECTION_DIVIDER}></div>
            ) : null}
          </div>
        ))}
      </nav>

      {/* Help/support card */}
      <div className={cn(SIDEBAR_HELP_CARD_BG, SIDEBAR_CARD, "mx-3 my-5 flex-row items-center gap-3 py-3 px-4")}>
        <span className={SIDEBAR_HELP_ICON_BG}>
          <HelpCircle className="w-6 h-6 text-[#A6B0D6]" />
        </span>
        <div>
          <span className="text-white font-semibold block text-sm">Need Help?</span>
          <span className="text-xs text-[#B0BADB] block mt-0.5">Contact support team</span>
        </div>
      </div>
      
      {/* Logout */}
      <Button
        variant="ghost"
        className={cn("w-full flex items-center gap-2 justify-start mb-4 mt-auto px-6 py-3", SIDEBAR_LOGOUT)}
        onClick={logout}
      >
        <LogOut className="w-5 h-5" />
        <span className="text-base">Logout</span>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <MobileToggle />
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)} />
        )}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-72",
          SIDEBAR_BG,
          "transition-transform duration-300 transform",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside className={cn(
      SIDEBAR_BG,
      "w-72 min-h-screen h-full flex flex-col sticky top-0 z-30"
    )}>
      {sidebarContent}
    </aside>
  );
}

// ... no export default to avoid confusion
