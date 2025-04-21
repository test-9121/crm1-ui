import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrganizationToolbarProps {
  onSearchChange: (term: string) => void;
  onNewOrganization: () => void;
}

const OrganizationToolbar = ({ 
  onSearchChange, 
  onNewOrganization 
}: OrganizationToolbarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search organizations..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="pl-9"
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-gradient-to-r from-[#22304a] via-[#22304a]/90 to-white/10 text-white hover:from-[#22304a]/80 hover:to-white/20"
          onClick={onNewOrganization}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Organization
        </Button>
      </div>
    </div>
  );
};

export default OrganizationToolbar;
