import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Role } from "@/modules/roles/types";
import RoleHeader from "@/modules/roles/components/RoleHeader";
import RoleToolbar from "@/modules/roles/components/RoleToolbar";
import RoleTable from "@/modules/roles/components/RoleTable";
import RoleForm from "@/modules/roles/components/RoleForm";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import RoleDetailsPanelContent from "@/modules/roles/components/RoleDetailsPanelContent";
import { PaginationMetadata } from "@/types/pagination";

const Roles = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Roles");
  const [tableColor, setTableColor] = useState("#f43f5e"); // Rose color
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  
  // States for role details panel
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleDetailsOpen, setRoleDetailsOpen] = useState(false);

  // Create pagination state for roles
  const [pagination, setPagination] = useState<PaginationMetadata>({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  });
  
  // Fetch roles
  const {
    roles = [],
    isLoading,
    isEmpty,
    error,
    createRole,
    updateRole,
    deleteRole,
    getRoleById
  } = useRoles();

  // Handler functions
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

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage - 1 // Convert from 1-indexed UI to 0-indexed backend
    }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination(prev => ({
      ...prev,
      page: 0,
      size: newSize
    }));
  };

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  };

  const handleEditRole = (role: Role) => {
    setRoleToEdit(role);
    setShowRoleForm(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      deleteRole.mutate(roleToDelete);
      setRoleToDelete(null);
    }
  };

  const showRoleDetails = (role: Role) => {
    setSelectedRole(role);
    setRoleDetailsOpen(true);
  };

  const hideRoleDetails = () => {
    setRoleDetailsOpen(false);
  };

  const handleFormClose = () => {
    setShowRoleForm(false);
    setRoleToEdit(null);
  };

  // Update pagination with the roles length
  if (Array.isArray(roles) && roles.length !== pagination.totalElements) {
    setPagination(prev => ({
      ...prev,
      totalElements: roles.length,
      totalPages: Math.ceil(roles.length / prev.size)
    }));
  }

  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    (role.roleName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (role.roleDescription || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate displayed roles based on pagination
  const startIdx = pagination.page * pagination.size;
  const endIdx = startIdx + pagination.size;
  const displayedRoles = filteredRoles.slice(startIdx, endIdx);

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <RoleToolbar 
          onSearchChange={handleSearchChange}
          onNewRole={() => {
            setRoleToEdit(null);
            setShowRoleForm(true);
          }}
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
                roles={displayedRoles}
                tableColor={tableColor}
                onEditRole={handleEditRole}
                onDeleteRole={handleDeleteRole}
                isLoading={isLoading}
                onRoleSelection={showRoleDetails}  // Changed from onRoleClick to onRoleSelection
                pagination={{
                  totalPages: pagination.totalPages,
                  pageSize: pagination.size,
                  currentPage: pagination.page + 1, // Convert to 1-indexed for UI
                  totalItems: pagination.totalElements,
                  totalElements: pagination.totalElements,
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
                This action cannot be undone. This will permanently delete the role.
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
