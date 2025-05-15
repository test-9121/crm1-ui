
import { Bell, User, Calendar, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  3
                </motion.span>
              </Badge>
            </motion.div>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between p-3 border-b"
        >
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          <Button variant="ghost" size="sm">Clear All</Button>
        </motion.div>
        <div className="max-h-80 overflow-y-auto p-1">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
              className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="bg-brand-500/10 p-2 rounded-full"
                >
                  {i % 3 === 0 ? (
                    <User className="h-5 w-5 text-brand-500" />
                  ) : i % 3 === 1 ? (
                    <Calendar className="h-5 w-5 text-brand-500" />
                  ) : (
                    <MessageSquare className="h-5 w-5 text-brand-500" />
                  )}
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {i % 3 === 0 ? "New lead assigned" : 
                     i % 3 === 1 ? "Meeting reminder" : 
                     "New message"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {i % 3 === 0 ? "Client K has been assigned to you" : 
                     i % 3 === 1 ? "You have a meeting in 30 minutes" : 
                     "You have a new message from Client B"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {i === 0 ? "Just now" : i === 1 ? "1 hour ago" : "3 hours ago"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="p-3 border-t text-center"
        >
          <Button variant="ghost" size="sm" className="w-full">View All Notifications</Button>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
