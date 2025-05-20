
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

// Import from restructured modules
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useUsers, useDesignations, useOrganizations, useIndustries } from "@/modules/common/hooks/useEntities";
import { leadService } from "@/modules/leads/services/leadService";
import { ILead } from "@/modules/leads/types";
import { LeadForm } from "@/modules/leads/components/LeadForm";
import LeadHeader from "@/modules/leads/components/LeadHeader";
import LeadToolbar from "@/modules/leads/components/LeadToolbar";
import LeadTable from "@/modules/leads/components/LeadTable";
import { adaptOrganizationsForLeads } from "@/modules/common/adapters/organizationAdapter";

const Leads = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("New Leads");
  const [tableColor, setTableColor] = useState("#3b82f6");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<ILead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const { leads, isLoading, isEmpty, getLeadById, pagination, 
    handlePageChange, 
    handlePageSizeChange,
    refetch } = useLeads();
    
  const { users, loading: usersLoading } = useUsers();
  const { designations, loading: designationsLoading } = useDesignations();
  const { organizations, loading: organizationsLoading } = useOrganizations();
  const { industries, loading: industriesLoading } = useIndustries();
  
  // Effect to handle URL-based lead editing
  useEffect(() => {
    if (id) {
      const currentLead = getLeadById(id);
      if (currentLead) {
        setLeadToEdit(currentLead);
        setShowNewLeadForm(true);
      } else {
        toast.error("Lead not found");
        navigate("/leads");
      }
    } else {
      // If no ID in URL, reset the edit state
      setLeadToEdit(null);
    }
  }, [id, getLeadById, navigate]);

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

  const handleNewLead = async (data: ILead) => {
    try {
      if (id) {
        // If we have an ID in the URL, this is an edit operation
        const response = await leadService.updateLead(id, data);
        return { success: true, data: response };
      } else {
        // If no ID, this is a create operation
        const response = await leadService.createLead(data);
        return { success: true, data: response };
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      return { 
        success: false, 
        error: error.message || "Failed to save lead. Please try again later." 
      };
    } finally {
      // Always invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  };

  const handleEditLead = (lead: ILead) => {
    // Update URL with lead ID instead of directly setting state
    navigate(`/leads/edit/${lead.id}`);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeadToDelete(leadId);
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      try {
        await leadService.deleteLead(leadToDelete);
        // Invalidate the leads query to refetch the updated data
        queryClient.invalidateQueries({ queryKey: ["leads"] });
        toast.success("Lead deleted successfully");
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Failed to delete lead. Please try again later.");
      }
      setLeadToDelete(null);
    }
  };

  // Handler to close the form and navigate back to leads list
  const handleFormClose = () => {
    setShowNewLeadForm(false);
    setLeadToEdit(null);
    
    // If we're in edit mode, navigate back to the leads list
    if (id) {
      navigate("/leads");
    }
  };

  const filteredLeads = leads.filter(lead => 
    `${lead.firstname} ${lead.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.organization?.name && lead.organization.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageIsLoading = usersLoading || designationsLoading || organizationsLoading || industriesLoading || isLoading;

  // Adapt organizations to the format expected by LeadForm
  const adaptedOrganizations = adaptOrganizationsForLeads(organizations);

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <LeadToolbar 
          onSearchChange={handleSearchChange}
          onNewLead={() => {
            setLeadToEdit(null);
            setShowNewLeadForm(true);
          }}
          onRefresh={refetch}
        />
        
        <LeadHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          leadsCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <>
          <div className="w-full overflow-x-auto">
            {pageIsLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading data...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No leads available. Click the "New Lead" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <LeadTable 
                leads={filteredLeads}
                tableColor={tableColor}
                onEditLead={handleEditLead}
                onDeleteLead={handleDeleteLead}
                isLoading={pageIsLoading}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                // Add this dummy value to avoid the error since we made accessedLead optional
                accessedLead={leads[0]}
              />
            )}
            </div>
          </>
        )}

        <LeadForm
          open={showNewLeadForm}
          onOpenChange={handleFormClose}
          onSubmit={handleNewLead}
          initialData={leadToEdit}
          industries={industries}
          designations={designations}
          users={users}
          organizations={adaptedOrganizations}
        />

        <AlertDialog open={leadToDelete !== null} onOpenChange={() => setLeadToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the lead.
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

export default Leads;
