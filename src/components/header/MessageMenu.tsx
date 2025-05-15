
import { MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MessagesMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl">
        <div className="flex items-center justify-between p-3 border-b">
          <DropdownMenuLabel className="text-base">Messages</DropdownMenuLabel>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>
        <div className="max-h-80 overflow-y-auto p-1">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>U{i+1}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-medium">Alex Johnson</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    I've reviewed the proposal and have some feedback for the next steps...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full">View All Messages</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
