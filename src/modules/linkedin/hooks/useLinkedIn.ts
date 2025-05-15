
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { linkedinService } from "../services/linkedinService";
import { LinkedInProfile, LinkedInFormValues } from "../types";

export const useLinkedIn = () => {
  const queryClient = useQueryClient();
  const [selectedProfile, setSelectedProfile] = useState<LinkedInProfile | null>(null);
  const [profileDetailsOpen, setProfileDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5
  });

   // Fetch all LinkedIn profiles
  // const { data: profiles, isLoading, error } = useQuery({
  //   queryKey: ["linkedin-profiles"],
  //   queryFn: linkedinService.getAll,
  // });

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["linkedin-profiles", pagination.page, pagination.size],
    queryFn: () => linkedinService.getAll(pagination.page, pagination.size),
  });

  const profiles = data?.data || [];
  const paginationData = data?.pagination || {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
    numberOfElements: 0,
    empty: true,
    size: 10,
    number: 0
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({
      page: 0, // Reset to first page when changing page size
      size: newSize
    });
  };


  const isEmpty = profiles.length === 0 && !isLoading && !isFetching;
 



  // Create a new LinkedIn profile
  const createProfile = useMutation({
    mutationFn: (data: LinkedInFormValues) => linkedinService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin-profiles"] });
      toast.success("LinkedIn profile created successfully");
    },
    onError: (err) => {
      console.error("Error creating LinkedIn profile:", err);
      toast.error("Failed to create LinkedIn profile");
    }
  });

  // Update a LinkedIn profile
  const updateProfile = useMutation({
    mutationFn: ({ id, data }: { id: string; data: LinkedInFormValues }) =>
      linkedinService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin-profiles"] });
      toast.success("LinkedIn profile updated successfully");
    },
    onError: (err) => {
      console.error("Error updating LinkedIn profile:", err);
      toast.error("Failed to update LinkedIn profile");
    }
  });

  // Delete a LinkedIn profile
  const deleteProfile = useMutation({
    mutationFn: (id: string) => linkedinService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin-profiles"] });
      toast.success("LinkedIn profile deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting LinkedIn profile:", err);
      toast.error("Failed to delete LinkedIn profile");
    }
  });

  // Get LinkedIn profile by ID
  const getProfileById = (id: string): LinkedInProfile | undefined => {
    return profiles?.find(profile => profile.id === id);
  };

  const showProfileDetails = (profile: LinkedInProfile) => {
    setSelectedProfile(profile);
    setProfileDetailsOpen(true);
  };

  const hideProfileDetails = () => {
    setProfileDetailsOpen(false);
  };

  return {
    profiles: Array.isArray(profiles) ? profiles : [],
    pagination: paginationData,
    isLoading : isLoading || isFetching,
    error,
    isEmpty,
    createProfile,
    updateProfile,
    deleteProfile,
    getProfileById,
    selectedProfile,
    profileDetailsOpen,
    showProfileDetails,
    hideProfileDetails,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
