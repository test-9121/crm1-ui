
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

// Role-related imports
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Role } from "@/modules/roles/types";
import RoleForm from "@/modules/roles/components/RoleForm";
import RoleHeader from "@/modules/roles/components/RoleHeader";
import RoleToolbar from "@/modules/roles/components/RoleToolbar";
import RoleTable from "@/modules/roles/components/RoleTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import RoleDetailsPanelContent from "@/modules/roles/components/RoleDetailsPanelContent";

const Roles = () => {
  // Removed useNavigate, useParams, useLocation, useEffect
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("System Roles");
  const [tableColor, setTableColor] = useState("#9b87f5");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const {
    roles = [],
    isLoading,
    isEmpty,
    deleteRole,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useRoles();
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
    // Direct edit without navigation or API call
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

  const handleRowClick = (role: Role) => {
    setSelectedRole(role);
    setIsDetailsPanelOpen(true);
  };

  // Filter roles based on search term
  const filteredRoles = Array.isArray(roles) 
    ? roles.filter(role => 
        role.roleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.roleDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.rolePermission?.toLowerCase().includes(searchTerm.toLowerCase())
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
                // onRowClick={handleRowClick}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
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
