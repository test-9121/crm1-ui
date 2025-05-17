
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Role } from "@/modules/roles/types";
import RoleForm from "@/modules/roles/components/RoleForm";
import RoleHeader from "@/modules/roles/components/RoleHeader";
import RoleToolbar from "@/modules/roles/components/RoleToolbar";
import RoleTable from "@/modules/roles/components/RoleTable";
import RoleDetailsPanelContent from "@/modules/roles/components/RoleDetailsPanelContent";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Roles = () => {
  // State declarations
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("User Roles");
  const [tableColor, setTableColor] = useState("#10b981");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Local states for role details, since they're not in the useRoles hook
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleDetailsOpen, setRoleDetailsOpen] = useState(false);

  // Fetch roles using the hook
  const {
    roles = [],
    isLoading,
    isEmpty,
    error
  } = useRoles();
  
  // Pagination values manually defined since they're not in useRoles
  const pagination = {
    page: 0,
    size: 10,
    totalElements: roles.length,
    totalPages: 1
  };
  
  // Handler functions
  const handlePageChange = (newPage: number) => {
    // Implementation would be based on the useRoles hook
    console.log("Change to page:", newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    // Implementation would be based on the useRoles hook
    console.log("Change page size to:", newSize);
  };

  const refetch = () => {
    // Implementation would be based on the useRoles hook
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  };

  const showRoleDetails = (role: Role) => {
    setSelectedRole(role);
    setRoleDetailsOpen(true);
  };

  const hideRoleDetails = () => {
    setSelectedRole(null);
    setRoleDetailsOpen(false);
  };

  const handleTableUpdate = (name: string, color: string) => {
    setTableName(name);
    setTableColor(color);
    setIsEditing(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const handleEditRole = (role: Role) => {
    setRoleToEdit(role);
    setShowRoleForm(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId);
  };

  const confirmDelete = async () => {
    // Implementation would be based on a deleteRole method from useRoles
    // This is just a placeholder
    if (roleToDelete) {
      try {
        // await deleteRole(roleToDelete);
        toast.success("Role deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      } catch (error) {
        console.error("Error deleting role:", error);
        toast.error("Failed to delete role");
      }
      setRoleToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowRoleForm(false);
    setRoleToEdit(null);
  };

  const handleOpenRoleDetails = (role: Role) => {
    showRoleDetails(role);
  };

  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    (role.roleName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (role.roleDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <RoleToolbar 
          onSearchChange={handleSearchChange}
          onNewRole={() => {
            setRoleToEdit(null);
            setShowRoleForm(true);
          }}
          onRefresh={refetch}
        />
        
        <RoleHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          rolesCount={filteredRoles.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading roles...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No roles available. Click the "New Role" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <RoleTable 
                roles={filteredRoles}
                tableColor={tableColor}
                onEditRole={handleEditRole}
                onDeleteRole={handleDeleteRole}
                isLoading={isLoading}
                onRoleClick={handleOpenRoleDetails}
                pagination={{
                  totalPages: pagination.totalPages || Math.ceil(pagination.totalElements / pagination.size),
                  pageSize: pagination.pageSize || pagination.size,
                  currentPage: pagination.currentPage || pagination.page,
                  totalItems: pagination.totalElements,
                  onPageChange: handlePageChange,
                  onPageSizeChange: handlePageSizeChange
                }}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying role details */}
        <DetailsSidePanel
          data={selectedRole}
          open={roleDetailsOpen}
          onClose={hideRoleDetails}
          renderContent={(role) => <RoleDetailsPanelContent role={role} />}
        />

        {/* Role Form */}
        {showRoleForm && (
          <RoleForm
            open={showRoleForm}
            onOpenChange={handleFormClose}
            initialData={roleToEdit}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={roleToDelete !== null} onOpenChange={() => setRoleToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this role.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Roles;
