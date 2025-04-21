
import DataTable from "@/components/shared/DataTable/DataTable";
import { Role } from "@/modules/roles/types";
import { Badge } from "@/components/ui/badge";

interface RoleTableProps {
  roles: Role[];
  tableColor: string;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  isLoading: boolean;
  onRowClick: (role: Role) => void;
}

const RoleTable = ({
  roles,
  tableColor,
  onEditRole,
  onDeleteRole,
  isLoading,
  onRowClick
}: RoleTableProps) => {
  const columns = [
    {
      header: "Name",
      accessorKey: "roleName",
      cell: (role: Role) => (
        <div
          className="cursor-pointer hover:text-primary transition-colors font-medium"
          onClick={() => onRowClick(role)}
        >
          {role.roleName}
        </div>
      )
    },
    {
      header: "Description",
      accessorKey: "roleDescription",
      cell: (role: Role) => <div className="truncate max-w-[400px]">{role.roleDescription}</div>
    },
    {
      header: "Permission",
      accessorKey: "rolePermission",
      cell: (role: Role) => {
        let color = "";
        switch (role.rolePermission) {
          case "ROLE_SUPER_ADMIN":
            color = "bg-red-100 text-red-800 hover:bg-red-200";
            break;
          case "ROLE_ADMIN":
            color = "bg-amber-100 text-amber-800 hover:bg-amber-200";
            break;
          case "ROLE_USER":
            color = "bg-green-100 text-green-800 hover:bg-green-200";
            break;
          default:
            color = "bg-gray-100 text-gray-800 hover:bg-gray-200";
        }

        return (
          <Badge
            className={`${color} font-medium rounded-md whitespace-nowrap`}
            variant="outline"
          >
            {role.rolePermission.replace('ROLE_', '')}
          </Badge>
        );
      }
    }
  ];

  return (
    <DataTable
      data={roles}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditRole}
      onDelete={(role: Role) => onDeleteRole(role.id)}
    />
  );
};

export default RoleTable;
