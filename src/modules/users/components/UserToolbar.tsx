import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserToolbarProps {
  onSearchChange: (value: string) => void;
  onNewUser: () => void;
}

const UserToolbar = ({ onSearchChange, onNewUser }: UserToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button
        className="bg-gradient-to-r from-[#22304a] via-[#22304a]/90 to-white/10 text-white hover:from-[#22304a]/80 hover:to-white/20"
        onClick={onNewUser}
      >
        <Plus className="h-4 w-4 mr-2" />
        New User
      </Button>
    </div>
  );
};

export default UserToolbar;
