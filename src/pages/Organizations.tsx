import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

// Organization-related imports
import { useOrganizations } from "@/modules/organizations/hooks/useOrganizations";
import { Organization } from "@/modules/organizations/types";
import OrganizationForm from "@/modules/organizations/components/OrganizationForm";
import OrganizationHeader from "@/modules/organizations/components/OrganizationHeader";
import OrganizationToolbar from "@/modules/organizations/components/OrganizationToolbar";
import OrganizationTable from "@/modules/organizations/components/OrganizationTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import OrganizationDetailsPanelContent from "@/modules/organizations/components/OrganizationDetailsPanelContent";

// Create a dummy pagination object for OrganizationTable
const dummyPagination = {
  page: 1,
  size: 10,
  totalPages: 1,
  totalElements: 0,
  pageNumber: 1,
  last: true,
  first: true,
  numberOfElements: 0,
  sort: null,
  empty: true,
  offset: 0
};

const Organizations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Organizations");
  const [tableColor, setTableColor] = useState("#4ade80");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const {
    organizations = [],
    isLoading,
    isEmpty,
    getOrganizationById,
    deleteOrganization,
    createOrganization,
    updateOrganization,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    refetch
  } = useOrganizations();

  // Effect to handle URL-based organization editing
  useEffect(() => {
    if (id) {
      const currentOrganization = getOrganizationById(id);
      if (currentOrganization) {
        setOrganizationToEdit(currentOrganization);
        setShowOrganizationForm(true);
      } else {
        toast.error("Organization not found");
        navigate("/organizations");
      }
    } else {
      // If no ID in URL, reset the edit state
      setOrganizationToEdit(null);
    }
  }, [id, getOrganizationById, navigate]);

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

  const handleNewOrganization = async (data: Organization) => {
    try {
      if (id) {
        // If we have an ID in the URL, this is an edit operation
        await updateOrganization.mutateAsync({ id, ...data });
        toast.success("Organization updated successfully");
      } else {
        // If no ID, this is a create operation
        await createOrganization.mutateAsync(data);
        toast.success("Organization created successfully");
      }
      // Invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      return { success: true };
    } catch (error: any) {
      console.error("Error saving organization:", error);
      toast.error(error.message || "Failed to save organization. Please try again later.");
      return { success: false, error: error.message || "Failed to save organization." };
    } finally {
      // Always invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    }
  };

  const handleEditOrganization = (organization: Organization) => {
    // Update URL with organization ID instead of directly setting state
    navigate(`/organizations/edit/${organization.id}`);
  };

  const handleDeleteOrganization = (organizationId: string) => {
    setOrganizationToDelete(organizationId);
  };

  const confirmDelete = async () => {
    if (organizationToDelete) {
      try {
        await deleteOrganization.mutateAsync(organizationToDelete);
        // Invalidate the organizations query to refetch the updated data
         queryClient.invalidateQueries({ queryKey: ["organizations"] });
        toast.success("Organization deleted successfully");
      } catch (error) {
        console.error("Error deleting organization:", error);
        toast.error("Failed to delete organization. Please try again later.");
      }
      setOrganizationToDelete(null);
    }
  };

  // Handler to close the form and navigate back to organizations list
  const handleFormClose = () => {
    setShowOrganizationForm(false);
    setOrganizationToEdit(null);

    // If we're in edit mode, navigate back to the organizations list
    if (id) {
      navigate("/organizations");
    }
  };

  const handleRowClick = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDetailsPanelOpen(true);
  };

  const filteredOrganizations = organizations.filter(organization =>
    organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    organization.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageIsLoading = isLoading;

  // Add these functions before the return statement
  const handlePageChange = (page: number) => {
    console.log("Page change requested:", page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log("Page size change requested:", pageSize);
  };

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
          organizationsCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <>
            <div className="w-full overflow-x-auto">
              {pageIsLoading ? (
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
                  isLoading={pageIsLoading}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  accessedOrganization={organizations[0] || null}
                />
              )}
            </div>
          </>
        )}

        <DetailsSidePanel
          data={selectedOrganization}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          renderContent={(organization) => <OrganizationDetailsPanelContent organization={organization} />}
        />

        <OrganizationForm
          open={showOrganizationForm}
          onOpenChange={handleFormClose}
          onSubmit={handleNewOrganization}
          initialData={organizationToEdit}
        />

        <AlertDialog open={organizationToDelete !== null} onOpenChange={() => setOrganizationToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the organization.
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
