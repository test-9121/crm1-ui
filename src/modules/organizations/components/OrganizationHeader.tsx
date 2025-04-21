
import DataTableHeader from "@/components/shared/DataTable/DataTableHeader";

interface OrganizationHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  organizationsCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const OrganizationHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  organizationsCount,
  onTableUpdate,
  onCollapse,
  onEditingChange
}: OrganizationHeaderProps) => {
  return (
    <DataTableHeader
      tableName={tableName}
      tableColor={tableColor}
      isEditing={isEditing}
      isCollapsed={isCollapsed}
      itemCount={organizationsCount}
      itemLabel="organization"
      onTableUpdate={onTableUpdate}
      onCollapse={onCollapse}
      onEditingChange={onEditingChange}
    />
  );
};

export default OrganizationHeader;
