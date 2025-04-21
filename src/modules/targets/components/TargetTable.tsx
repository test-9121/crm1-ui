
import DataTable from "@/components/shared/DataTable/DataTable";
import { Target } from "@/modules/targets/types";
import { Badge } from "@/components/ui/badge";

interface TargetTableProps {
  targets: Target[];
  tableColor: string;
  onEditTarget: (target: Target) => void;
  onDeleteTarget: (targetId: string) => void;
  isLoading: boolean;
  onRowClick: (target: Target) => void;
}

const TargetTable = ({
  targets,
  tableColor,
  onEditTarget,
  onDeleteTarget,
  isLoading,
  onRowClick
}: TargetTableProps) => {
  const columns = [
    {
      header: "Account Name",
      accessorKey: "accountName",
      cell: (target: Target) => (
        <div
          className="cursor-pointer hover:text-primary transition-colors font-medium"
          onClick={() => onRowClick(target)}
        >
          {target.accountName}
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (target: Target) => {
        const statusColorMap: Record<string, string> = {
          "Active": "bg-green-100 text-green-800 hover:bg-green-200",
          "Completed": "bg-blue-100 text-blue-800 hover:bg-blue-200",
          "InActive": "bg-orange-100 text-orange-800 hover:bg-orange-200",
          "On Hold": "bg-orange-100 text-orange-800 hover:bg-orange-200",
        };
        
        const statusColor = statusColorMap[target.status] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
        
        return (
          <Badge
            className={`${statusColor} font-medium rounded-md whitespace-nowrap`}
            variant="outline"
          >
            {target.status}
          </Badge>
        );
      }
    },
    {
      header: "Connections",
      accessorKey: "connectionsCount",
    },
    {
      header: "Leads",
      accessorKey: "noOfLeadsIdentified",
    },
    {
      header: "Meetings",
      accessorKey: "meetingsScheduled",
    }
  ];

  return (
    <DataTable
      data={targets}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditTarget}
      onDelete={(target: Target) => onDeleteTarget(target.id)}
    />
  );
};

export default TargetTable;
