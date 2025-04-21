import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, Search, User, ChevronDown } from "lucide-react";

interface LeadToolbarProps {
  onSearchChange: (term: string) => void;
  onNewLead: () => void;
}

const LeadToolbar = ({ onSearchChange, onNewLead }: LeadToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          className="gap-2 bg-gradient-to-r from-[#22304a] via-[#22304a]/90 to-white/10 text-white hover:from-[#22304a]/80 hover:to-white/20"
          variant="default"
          onClick={onNewLead}
        >
          <span>New lead</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 border rounded-md p-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search"
            className="border-0 p-0 focus-visible:ring-0 text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button variant="outline" size="icon" className="gap-2">
          <User className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="gap-2">
          <span>Group by</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LeadToolbar;
