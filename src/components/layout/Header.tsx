
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessagesMenu } from '../header/MessageMenu';
import { NotificationMenu } from '../header/NotificationMenu';
import { ThemeToggle } from '../header/ThemeToggle';
import { UserMenu } from '../header/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();
  const userRole = user?.role?.roleName|| 'User';
  const organization = user?.organization?.name || 'No Organization';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-transparent sticky top-0 z-10 "
    >
      <div className="flex h-16 items-center px-4 gap-4">
        {/* <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">E</span>
          </div>
          <span className="font-semibold">Ensar CRM</span>
        </div> */}
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="hidden md:flex md:flex-1 items-center gap-4"
        >
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium">{organization}</span>
            <span>•</span>
            <span>{userRole}</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4 ml-auto"
        >
          {/* <MessagesMenu />
          <NotificationMenu /> */}
          <ThemeToggle />
          <UserMenu />
        </motion.div>
      </div>
    </motion.header>
  );
}
