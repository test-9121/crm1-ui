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
import { useLinkedIn } from "@/modules/linkedin/hooks/useLinkedIn";
import { LinkedInProfile } from "@/modules/linkedin/types";
import LinkedInHeader from "@/modules/linkedin/components/LinkedInHeader";
import LinkedInToolbar from "@/modules/linkedin/components/LinkedInToolbar";
import LinkedInDetailsPanelContent from "@/modules/linkedin/components/LinkedInDetailsPanelContent";
import LinkedInForm from "@/modules/linkedin/components/LinkedInForm";
import LinkedInTable from "@/modules/linkedin/components/LinkedInTable";

const LinkedIn = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("LinkedIn Profiles");
  const [tableColor, setTableColor] = useState("#f59e0b"); // Amber color
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fetch profiles using the hook
  const {
    profiles = [],
    isLoading,
    isEmpty,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    deleteProfile,
    updateProfile,
    createProfile,
    selectedProfile,
    profileDetailsOpen,
    showProfileDetails,
    hideProfileDetails
  } = useLinkedIn();

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

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<LinkedInProfile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  const handleEditProfile = (profile: LinkedInProfile) => {
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

  const handleOpenProfileDetails = (profile: LinkedInProfile) => {
    showProfileDetails(profile);
  };

  // Filter profiles based on search term
  const filteredProfiles = Array.isArray(profiles) 
    ? profiles.filter(profile => 
        (profile.name?.toLowerCase() || profile.profileName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (profile.title?.toLowerCase() || profile.profileTitle?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (profile.company?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    : [];

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
          profilesCount={filteredProfiles.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading profiles...</p>
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
                onProfileClick={handleOpenProfileDetails}
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

        {/* Side panel for displaying profile details */}
        <DetailsSidePanel
          data={selectedProfile}
          open={profileDetailsOpen}
          onClose={hideProfileDetails}
          renderContent={(profile) => <LinkedInDetailsPanelContent profile={profile} />}
        />

        {/* LinkedIn Form */}
        {showProfileForm && (
          <LinkedInForm
            open={showProfileForm}
            onOpenChange={handleFormClose}
            initialData={profileToEdit}
          />
        )}

        {/* Delete Confirmation */}
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
