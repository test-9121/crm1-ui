
import DataTableHeader from "@/components/shared/DataTable/DataTableHeader";

interface LeadHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  leadsCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const LeadHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  leadsCount,
  onTableUpdate,
  onCollapse,
  onEditingChange
}: LeadHeaderProps) => {
  return (
    <DataTableHeader
      tableName={tableName}
      tableColor={tableColor}
      isEditing={isEditing}
      isCollapsed={isCollapsed}
      itemCount={leadsCount}
      itemLabel="lead"
      onTableUpdate={onTableUpdate}
      onCollapse={onCollapse}
      onEditingChange={onEditingChange}
    />
  );
};

export default LeadHeader;
