
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserToolbarProps {
  onSearchChange: (value: string) => void;
  onNewUser: () => void;
}

const UserToolbar = ({ onSearchChange, onNewUser }: UserToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between animate-fade-in">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8 hover-translate focus:hover-glow transition-all duration-300"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button onClick={onNewUser} className="gap-2 hover-translate">
        <Plus className="h-4 w-4" />
        New User
      </Button>
    </div>
  );
};

export default UserToolbar;
