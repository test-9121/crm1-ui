import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
import { useLinkedIn } from "@/modules/linkedin/hooks/useLinkedIn";
import { LinkedInProfile } from "@/modules/linkedin/types";
import LinkedInForm from "@/modules/linkedin/components/LinkedInForm";
import LinkedInHeader from "@/modules/linkedin/components/LinkedInHeader";
import LinkedInToolbar from "@/modules/linkedin/components/LinkedInToolbar";
import LinkedInTable from "@/modules/linkedin/components/LinkedInTable";
import LinkedInDetailsPanelContent from "@/modules/linkedin/components/LinkedInDetailsPanelContent";
import { OverviewCard } from "@/components/OverviewCard";

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
    hideProfileDetails
  } = useLinkedIn();

  useEffect(() => {
    if (id) {
      const currentProfile = getProfileById(id);
      if (currentProfile) {
        setProfileToEdit(currentProfile);
        setShowProfileForm(true);
      } else {
        toast.error("LinkedIn profile not found");
        navigate("/linkedin", { replace: true });
      }
    } else {
      if (!location.pathname.includes("/edit/")) {
        setProfileToEdit(null);
      }
    }
  }, [id, getProfileById, navigate, location.pathname]);

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
    setProfileToEdit(profile);
    setShowProfileForm(true);
    
    navigate(`/linkedin/edit/${profile.id}`, { replace: false });
  };

  const handleDeleteProfile = (profile: LinkedInProfile) => {
    setProfileToDelete(profile.id);
  };

  const confirmDelete = () => {
    if (profileToDelete) {
      deleteProfile.mutate(profileToDelete);
      setProfileToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowProfileForm(false);
    
    navigate("/linkedin", { replace: true });
    
    setTimeout(() => {
      setProfileToEdit(null);
    }, 100);
  };

  const handleProfileClick = (profile: LinkedInProfile) => {
    showProfileDetails(profile);
  };

  const profilesArray = Array.isArray(profiles) ? profiles : [];
  
  const filteredProfiles = profilesArray.filter(profile => {
    const searchableValues = [
      profile.headline || profile.accountName || '',
      profile.company || '',
      profile.industry || '',
      profile.location || profile.country || '',
      profile.currentPosition || profile.designation || ''
    ].map(val => val.toLowerCase());
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return searchableValues.some(value => value.includes(lowerSearchTerm));
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <LinkedInToolbar 
          onSearchChange={handleSearchChange}
          onNewProfile={() => {
            setProfileToEdit(null);
            setShowProfileForm(true);
          }}
        />

        <div className="mb-2">
          <OverviewCard
            label="Profiles"
            count={filteredProfiles.length}
            color="#22304a"
          />
        </div>
        
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
                onProfileClick={handleProfileClick}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        <DetailsSidePanel
          data={selectedProfile}
          open={profileDetailsOpen}
          onClose={hideProfileDetails}
          renderContent={(profile) => <LinkedInDetailsPanelContent profile={profile} />}
        />

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
    </DashboardLayout>
  );
};

export default LinkedIn;
