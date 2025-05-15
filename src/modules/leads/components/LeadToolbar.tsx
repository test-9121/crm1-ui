
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, Search, User, ChevronDown, Import, Download, FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { leadService } from "@/modules/leads/services/leadService";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadImportDialog } from "./LeadImportDialog";

interface LeadToolbarProps {
  onSearchChange: (term: string) => void;
  onNewLead: () => void;
  onRefresh?: () => void;
}

const LeadToolbar = ({ onSearchChange, onNewLead, onRefresh }: LeadToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await leadService.exportLeads();
      
      // Create a filename with the current date
      const fileName = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
      toast.success("Leads exported successfully as CSV");
    } catch (error) {
      console.error("Error exporting leads:", error);
      toast.error("Failed to export leads");
    } finally {
      setExporting(false);
    }
  };

  const handleImportFile = async (file: File) => {
    try {
      const result = await leadService.importLeads(file);
      // The success message is now shown in the dialog with detailed stats
      
      // Refresh the leads list if callback provided
      if (onRefresh) onRefresh();
      
      return result;
    } catch (error) {
      console.error("Error importing leads:", error);
      toast.error("Failed to import leads");
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button className="gap-2" variant="default" onClick={onNewLead}>
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

        {/* Import/Export dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Import/Export</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setShowImportDialog(true)} className="cursor-pointer">
              <Import className="h-4 w-4 mr-2" />
              Import Leads
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExport} disabled={exporting} className="cursor-pointer">
              <Download className="h-4 w-4 mr-2" />
              {exporting ? "Exporting..." : "Export Leads"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Import Dialog */}
        <LeadImportDialog 
          open={showImportDialog} 
          onOpenChange={setShowImportDialog} 
          onImport={handleImportFile}
        />
      </div>
      
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LeadToolbar;
