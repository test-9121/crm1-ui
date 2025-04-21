
import { Organization } from "@/modules/organizations/types";
import DataTable, { Column } from "@/components/shared/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";

interface OrganizationTableProps {
  organizations: Organization[];
  tableColor: string;
  onEditOrganization: (organization: Organization) => void;
  onDeleteOrganization: (id: string) => void;
  isLoading?: boolean;
}

const OrganizationTable = ({
  organizations,
  tableColor,
  onEditOrganization,
  onDeleteOrganization,
  isLoading = false,
}: OrganizationTableProps) => {
  const columns: Column<Organization>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Domain",
      accessorKey: "domain",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "disabled",
      cell: (organization) => (
        <Badge variant={organization.disabled ? "destructive" : "default"}>
          {organization.disabled ? "Disabled" : "Active"}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable
      data={organizations}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditOrganization}
      onDelete={(organization) => onDeleteOrganization(organization.id)}
    />
  );
};

export default OrganizationTable;
