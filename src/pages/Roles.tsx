
import { useState } from "react";
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
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Role } from "@/modules/roles/types";
import RoleForm from "@/modules/roles/components/RoleForm";
import RoleHeader from "@/modules/roles/components/RoleHeader";
import RoleToolbar from "@/modules/roles/components/RoleToolbar";
import RoleDetailsPanelContent from "@/modules/roles/components/RoleDetailsPanelContent";
import { RoleTable } from "@/modules/roles/components/RoleTable";

const Roles = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Roles");
  const [tableColor, setTableColor] = useState("#9333ea"); // Purple color
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Fetch roles
  const {
    roles = [],
    isLoading,
    isEmpty,
    deleteRole
  } = useRoles();

  // Create dummy pagination data for now
  const dummyPagination = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalElements: roles.length,
    pageNumber: 1,
    pageSize: 10,
    last: true,
    first: true,
    numberOfElements: roles.length,
    sort: null,
    empty: roles.length === 0,
    offset: 0,
    number: 0
  };

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

  const handleFormClose = () => {
    setShowRoleForm(false);
    setRoleToEdit(null);
  };

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setIsDetailsPanelOpen(true);
  };

  // Dummy page change handlers since we're not implementing real pagination yet
  const handlePageChange = (page: number) => {
    toast.info(`Changed to page ${page}. Implement real pagination.`);
  };

  const handlePageSizeChange = (pageSize: number) => {
    toast.info(`Changed page size to ${pageSize}. Implement real pagination.`);
  };

  // Filter roles based on search term
  const filteredRoles = Array.isArray(roles) 
    ? roles.filter(role => 
        role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
                roles={filteredRoles}
                tableColor={tableColor}
                onEditRole={handleEditRole}
                onDeleteRole={handleDeleteRole}
                isLoading={isLoading}
                onRoleClick={handleRoleClick}
                pagination={dummyPagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                accessedRole={null}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying role details */}
        <DetailsSidePanel
          data={selectedRole}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
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
