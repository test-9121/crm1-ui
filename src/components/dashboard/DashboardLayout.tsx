
import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { addButtonAnimations } from "@/lib/animations";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  
  // Add animations to all buttons in the application
  useEffect(() => {
    addButtonAnimations();
    
    // Re-run animation when DOM changes (for dynamically added buttons)
    const observer = new MutationObserver(() => {
      addButtonAnimations();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className={cn(
        "flex-1 overflow-y-auto animate-fade-in",
        isMobile ? "pt-16" : "" // Add padding for the mobile toggle button
      )}>
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
