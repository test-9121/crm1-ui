
import { User } from "@/modules/users/types";
import DataTable, { Column } from "@/components/shared/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface UserTableProps {
  users: User[];
  tableColor: string;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  isLoading?: boolean;
}

const UserTable = ({
  users,
  tableColor,
  onEditUser,
  onDeleteUser,
  isLoading = false,
}: UserTableProps) => {
  const columns: Column<User>[] = [
    {
      header: "User",
      accessorKey: "name",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
              <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{`${user.firstName} ${user.lastName}`}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role.roleName",
      cell: (user) => (
        <span className="font-medium text-sm capitalize">{user.role.roleName}</span>
      ),
    },
    {
      header: "Organization",
      accessorKey: "organization.name",
      cell: (user) => (
        <span className="text-sm">{user.organization.name}</span>
      ),
    },
    {
      header: "Contact",
      accessorKey: "phoneNumber",
      cell: (user) => (
        <div className="flex flex-col">
          <span className="text-sm">{user.phoneNumber || '-'}</span>
          <span className="text-xs text-muted-foreground">{user.city && user.state ? `${user.city}, ${user.state}` : '-'}</span>
        </div>
      ),
    },
    {
      header: "Department",
      accessorKey: "department",
      cell: (user) => (
        <span className="text-sm">{user.department || '-'}</span>
      ),
    },
    {
      header: "Job Title",
      accessorKey: "jobTitle",
      cell: (user) => (
        <span className="text-sm">{user.jobTitle || '-'}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "disabled",
      cell: (user) => (
        <div className="flex flex-col gap-1">
          <Badge 
            variant={user.disabled ? "outline" : "default"}
            className={!user.disabled ? "bg-green-500" : ""}
          >
            {user.disabled ? "Inactive" : "Active"}
          </Badge>
          {user.verified && (
            <Badge variant="default" className="bg-blue-500">
              Verified
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Last Login",
      accessorKey: "lastLoginDateTime",
      cell: (user) => (
        <span className="text-sm">
          {user.lastLoginDateTime ? formatDate(user.lastLoginDateTime) : "Never"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        data={users}
        columns={columns}
        tableColor={tableColor}
        isLoading={isLoading}
        onEdit={onEditUser}
        onDelete={(user) => onDeleteUser(user.id)}
      />
    </div>
  );
};

export default UserTable;
