import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { RoleForm } from "@/modules/roles/components/RoleForm";
import RoleHeader from "@/modules/roles/components/RoleHeader";
import RoleToolbar from "@/modules/roles/components/RoleToolbar";
import RoleTable from "@/modules/roles/components/RoleTable";
import { toast } from "@/components/ui/sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Roles");
  const [tableColor, setTableColor] = useState("#0ea5e9"); // Cyan color
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const useRolesData = useRoles();
  const roles = useRolesData.roles;
  const isLoading = useRolesData.isLoading;
  const isEmpty = useRolesData.isEmpty;

  // Add default pagination if it doesn't exist
  const defaultPagination = {
    page: 0,
    size: 10,
    totalElements: roles.length,
    totalPages: Math.ceil(roles.length / 10),
    pageSize: 10,
    currentPage: 1,
  };
  
  const pagination = useRolesData.pagination || defaultPagination;
  const handlePageChange = useRolesData.handlePageChange || ((page: number) => console.log('Page change', page));
  const handlePageSizeChange = useRolesData.handlePageSizeChange || ((size: number) => console.log('Size change', size));
  const refetch = useRolesData.refetch || (() => Promise.resolve());
  const selectedRole = useRolesData.selectedRole || null;
  const roleDetailsOpen = useRolesData.roleDetailsOpen || false;
  const showRoleDetails = useRolesData.showRoleDetails || ((role: Role) => console.log('Show role details', role));
  const hideRoleDetails = useRolesData.hideRoleDetails || (() => console.log('Hide role details'));

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

  const handleNewRole = async (data: Role) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("New role data:", data);
      toast.success("Role saved successfully");
      setShowRoleForm(false);
      return { success: true };
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("Failed to save role. Please try again later.");
      return { success: false };
    } finally {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    }
  };

  const handleEditRole = (role: Role) => {
    setRoleToEdit(role);
    setShowRoleForm(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId);
  };

  const confirmDelete = async () => {
    if (roleToDelete) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Deleting role with ID:", roleToDelete);
        toast.success("Role deleted successfully");
      } catch (error) {
        console.error("Error deleting role:", error);
        toast.error("Failed to delete role. Please try again later.");
      } finally {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        setRoleToDelete(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowRoleForm(false);
    setRoleToEdit(null);
  };

  const filteredRoles = roles.filter(role =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.roleDescription.toLowerCase().includes(searchTerm.toLowerCase())
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
          // Use the onRefresh prop correctly if available
          onRefresh={refetch}
        />

        <RoleHeader
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          rolesCount={roles.length}
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
                accessedRole={roles[0] || {} as Role} // Provide a default
                pagination={{
                  totalElements: pagination.totalElements,
                  totalPages: pagination.totalPages,
                  size: pagination.size,
                  page: pagination.page,
                  pageSize: pagination.size, // Use size as pageSize
                }}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}

        <RoleForm
          open={showRoleForm}
          onOpenChange={handleFormClose}
          onSubmit={handleNewRole}
          initialData={roleToEdit}
        />

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
