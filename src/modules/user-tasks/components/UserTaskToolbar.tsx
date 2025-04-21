
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCheck, Plus, Search, X } from "lucide-react";

interface UserTaskToolbarProps {
  onSearchChange: (term: string) => void;
  onNewUserTask: () => void;
}

const UserTaskToolbar = ({
  onSearchChange,
  onNewUserTask,
}: UserTaskToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">User Tasks</h2>
      </div>

      <div className="flex flex-1 sm:flex-initial gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 pr-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button onClick={onNewUserTask}>
          <Plus className="h-4 w-4 mr-1" />
          New Task
        </Button>
      </div>
    </div>
  );
};

export default UserTaskToolbar;
