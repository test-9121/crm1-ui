
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.firstName || localStorage.getItem('userName') || 'User Name';
  const userEmail = user?.email || localStorage.getItem('userEmail') || 'user@example.com';

  const handleLogout = () => {
    logout();
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full pl-1 pr-2 py-1.5">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{userName.charAt(0) || "U"}</span>
          </div>
          <div className="flex items-center text-left">
            <div className="hidden md:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Account</p>
            </div>
            <ChevronDown className="h-4 w-4 ml-1 hidden md:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-0 rounded-xl">
        <div className="p-3 border-b">
          <p className="font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <div className="p-2">
          <DropdownMenuItem className="py-2 cursor-pointer" onClick={goToProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <DropdownMenuItem 
            className="py-2 cursor-pointer text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
