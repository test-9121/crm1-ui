import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ILead } from "@/modules/leads/types";
import DataTable, { Column } from "@/components/shared/DataTable/DataTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { LeadDetailsPanelContent } from "./LeadDetailsPanelContent";
import { useState } from "react";

interface LeadTableProps {
  leads: ILead[];
  tableColor: string;
  onEditLead: (lead: ILead) => void;
  onDeleteLead: (leadId: string) => void;
  isLoading?: boolean;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "New": return "bg-orange-100 text-orange-800 hover:bg-orange-100/80";
    case "Contacted": return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
    case "Qualified": return "bg-green-100 text-green-800 hover:bg-green-100/80";
    case "Lost": return "bg-red-100 text-red-800 hover:bg-red-100/80";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
  }
};

const LeadTable = ({ leads, tableColor, onEditLead, onDeleteLead, isLoading = false }: LeadTableProps) => {
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  const handleLeadClick = (lead: ILead) => {
    setSelectedLead(lead);
    setShowDetailsPanel(true);
  };

  const columns: Column<ILead>[] = [
    {
      header: "Lead",
      accessorKey: "name",
      cell: (lead) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="p-0 h-auto font-normal hover:underline"
            onClick={() => handleLeadClick(lead)}
          >
            {`${lead.firstname} ${lead.lastname}`}
          </Button>
          {lead.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verified
            </Badge>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (lead) => (
        <Badge variant="secondary" className={getStatusColor(lead.status)}>
          {lead.status}
        </Badge>
      ),
    },
    {
      header: "Industry",
      accessorKey: "industry.name",
    },
    {
      header: "Company",
      accessorKey: "organization.name",
    },
    {
      header: "Title",
      accessorKey: "designation.name",
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (lead) => (
        <span className="text-blue-600">{lead.email}</span>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phonenumber",
      cell: (lead) => (
        <div className="flex items-center gap-2">
          {lead.sentby?.country && (
            <img
              src={`https://flagcdn.com/${lead.sentby.country.toLowerCase()}.svg`}
              alt={lead.sentby.country}
              className="h-4 w-6"
            />
          )}
          {lead.phonenumber}
        </div>
      ),
    },
    {
      header: "Region",
      accessorKey: "region",
    },
  ];

  return (
    <>
      <DataTable
        data={leads}
        columns={columns}
        tableColor={tableColor}
        isLoading={isLoading}
        onEdit={onEditLead}
        onDelete={(lead) => onDeleteLead(lead.id)}
      />

      <DetailsSidePanel
        data={selectedLead}
        open={showDetailsPanel}
        onClose={() => setShowDetailsPanel(false)}
        renderContent={(lead) => <LeadDetailsPanelContent lead={lead} />}
      />
    </>
  );
};

export default LeadTable;
