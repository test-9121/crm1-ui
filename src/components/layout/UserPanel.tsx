
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface UserPanelProps {
  open: boolean;
  onClose: () => void;
}

export const UserPanel = ({ open, onClose }: UserPanelProps) => {
  const { logout, user } = useAuth();

  const getRoleBadge = () => {
    const rolePermission = user?.role?.rolePermission || '';
    
    switch (rolePermission) {
      case 'ROLE_SUPER_ADMIN':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Super Admin</Badge>;
      case 'ROLE_ADMIN':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Admin</Badge>;
      case 'ROLE_USER':
        return <Badge className="bg-green-500 hover:bg-green-600">User</Badge>;
      default:
        return null;
    }
  };

  const menuItems = [
    { label: "Home", icon: "🏠" },
    { label: "Profile", icon: "👤" },
    { label: "Projects", icon: "📁", badge: "3" },
    { label: "Subscription", icon: "💳" },
    { label: "Security", icon: "🔒" },
    { label: "Account settings", icon: "⚙️" },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <ScrollArea className="flex-1">
          <div className="flex flex-col items-center py-8">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-1">
                {user ? `${user.firstName} ${user.lastName || ''}` : "User"}
              </h2>
              <p className="text-muted-foreground mb-2">{user?.email}</p>
              {getRoleBadge()}
            </div>

            <div className="w-full mt-6 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start text-left h-12"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        <Button
          variant="destructive"
          className="mt-4"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          Logout
        </Button>
      </SheetContent>
    </Sheet>
  );
};
