
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useOrganizations } from "@/modules/organizations/hooks/useOrganizations";
import { Organization } from "@/modules/organizations/types";
import { OrganizationForm } from "@/modules/organizations/components/OrganizationForm";
import OrganizationHeader from "@/modules/organizations/components/OrganizationHeader";
import OrganizationToolbar from "@/modules/organizations/components/OrganizationToolbar";
import OrganizationTable from "@/modules/organizations/components/OrganizationTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import OrganizationDetailsPanelContent from "@/modules/organizations/components/OrganizationDetailsPanelContent";
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

const Organizations = () => {
  // State declarations
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Organizations");
  const [tableColor, setTableColor] = useState("#0ea5e9");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Fetch organizations using the hook
  const {
    organizations = [],
    isLoading,
    isEmpty,
    pagination,
    updateOrganization,
    createOrganization,
    deleteOrganization,
    refetch,
    handlePageChange,
    handlePageSizeChange
  } = useOrganizations();

  const [organizationDetailsOpen, setOrganizationDetailsOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

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

  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);

  const handleEditOrganization = (organization: Organization) => {
    setOrganizationToEdit(organization);
    setShowOrganizationForm(true);
  };

  const handleDeleteOrganization = (organizationId: string) => {
    setOrganizationToDelete(organizationId);
  };

  const confirmDelete = async () => {
    if (organizationToDelete) {
      try {
        await deleteOrganization.mutateAsync(organizationToDelete);
        toast.success("Organization deleted successfully");
      } catch (error) {
        console.error("Error deleting organization:", error);
        toast.error("Failed to delete organization");
      }
      setOrganizationToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowOrganizationForm(false);
    setOrganizationToEdit(null);
  };

  const handleOpenOrganizationDetails = (organization: Organization) => {
    setSelectedOrganization(organization);
    setOrganizationDetailsOpen(true);
  };

  const handleUpdateOrganization = async (orgId: string, data: Partial<Organization>) => {
    try {
      await updateOrganization.mutateAsync({ 
        id: orgId, 
        data 
      });
      toast.success("Organization updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
      return false;
    }
  };

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <OrganizationToolbar 
          onSearchChange={handleSearchChange}
          onNewOrganization={() => {
            setOrganizationToEdit(null);
            setShowOrganizationForm(true);
          }}
          onRefresh={refetch}
        />
        
        <OrganizationHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          organizationsCount={filteredOrganizations.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading organizations...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No organizations available. Click the "New Organization" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <OrganizationTable 
                organizations={filteredOrganizations}
                tableColor={tableColor}
                onEditOrganization={handleEditOrganization}
                onDeleteOrganization={handleDeleteOrganization}
                isLoading={isLoading}
                onOrganizationClick={handleOpenOrganizationDetails}
                pagination={{
                  totalPages: pagination.totalPages || Math.ceil(pagination.totalElements / pagination.size),
                  pageSize: pagination.pageSize || pagination.size,
                  totalItems: pagination.totalElements,
                  currentPage: pagination.pageNumber !== undefined 
                    ? pagination.pageNumber + 1 
                    : pagination.number !== undefined 
                      ? pagination.number + 1
                      : 1,
                  onPageChange: handlePageChange,
                  onPageSizeChange: handlePageSizeChange
                }}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying organization details */}
        <DetailsSidePanel
          data={selectedOrganization}
          open={organizationDetailsOpen}
          onClose={() => setOrganizationDetailsOpen(false)}
          renderContent={(org) => <OrganizationDetailsPanelContent organization={org} />}
        />

        {/* Organization Form */}
        {showOrganizationForm && (
          <OrganizationForm
            open={showOrganizationForm}
            onOpenChange={handleFormClose}
            initialData={organizationToEdit}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog 
          open={organizationToDelete !== null} 
          onOpenChange={() => setOrganizationToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this organization.
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

export default Organizations;
