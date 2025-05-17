
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
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

// LinkedIn-related imports
import { useLinkedIn } from "@/modules/linkedin/hooks/useLinkedIn";
import { LinkedInProfile } from "@/modules/linkedin/types";
import LinkedInForm from "@/modules/linkedin/components/LinkedInForm";
import LinkedInHeader from "@/modules/linkedin/components/LinkedInHeader";
import LinkedInToolbar from "@/modules/linkedin/components/LinkedInToolbar";
import LinkedInTable from "@/modules/linkedin/components/LinkedInTable";
import LinkedInDetailsPanelContent from "@/modules/linkedin/components/LinkedInDetailsPanelContent";
import { handleRowClick } from "@/components/shared/TableRowClickHandler";

const LinkedIn = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("LinkedIn Profiles");
  const [tableColor, setTableColor] = useState("#0077B5"); // LinkedIn blue
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<LinkedInProfile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  const {
    profiles,
    isLoading,
    isEmpty,
    getProfileById,
    deleteProfile,
    selectedProfile,
    profileDetailsOpen,
    showProfileDetails,
    hideProfileDetails,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useLinkedIn();

  // Effect to handle URL-based profile editing - REMOVED to prevent API calls
  // Now we'll handle everything directly without using the URL

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

  const handleEditProfile = (profile: LinkedInProfile) => {
    // Set the profile directly without navigation to prevent API call
    setProfileToEdit(profile);
    setShowProfileForm(true);
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfileToDelete(profileId);
  };

  const confirmDelete = () => {
    if (profileToDelete) {
      deleteProfile.mutate(profileToDelete);
      setProfileToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowProfileForm(false);
    setProfileToEdit(null);
  };

  // Ensure profiles is always an array before filtering
  const profilesArray = Array.isArray(profiles) ? profiles : [];
  
  const filteredProfiles = profilesArray.filter(profile => {
    // Get the searchable values, using fallbacks for missing properties
    const searchableValues = [
      profile.headline || profile.accountName || '',
      profile.company || '',
      profile.industry || '',
      profile.location || profile.country || '',
      profile.currentPosition || profile.designation || ''
    ].map(val => val.toLowerCase());
    
    // Check if the search term matches any of the searchable values
    const lowerSearchTerm = searchTerm.toLowerCase();
    return searchableValues.some(value => value.includes(lowerSearchTerm));
  });

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <LinkedInToolbar 
          onSearchChange={handleSearchChange}
          onNewProfile={() => {
            setProfileToEdit(null);
            setShowProfileForm(true);
          }}
        />
        
        <LinkedInHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          profilesCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading LinkedIn profiles...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No LinkedIn profiles available. Click the "New Profile" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <LinkedInTable 
                profiles={filteredProfiles}
                tableColor={tableColor}
                onEditProfile={handleEditProfile}
                onDeleteProfile={handleDeleteProfile}
                isLoading={isLoading}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onRowClick={showProfileDetails}
              />
            )}
          </div>
        )}

        {/* Side panel for viewing LinkedIn profile details */}
        <DetailsSidePanel
          data={selectedProfile}
          open={profileDetailsOpen}
          onClose={hideProfileDetails}
          renderContent={(profile) => <LinkedInDetailsPanelContent profile={profile} />}
        />

        {/* Only render the LinkedInForm when showProfileForm is true */}
        {showProfileForm && (
          <LinkedInForm
            open={showProfileForm}
            onOpenChange={handleFormClose}
            initialData={profileToEdit}
          />
        )}

        <AlertDialog open={profileToDelete !== null} onOpenChange={() => setProfileToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the LinkedIn profile.
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

export default LinkedIn;
