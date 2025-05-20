
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { Organization } from "@/modules/organizations/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";


export const useOrganizations = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5
  });

  const { 
    data, 
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["organizations", pagination.page, pagination.size],
    queryFn: () => organizationService.getAll(pagination.page, pagination.size),
  });

  const organizations = data?.data||  [];

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

  const getOrganizationById = (id: string): Organization | undefined => {
    return organizations.find(org => org.id === id);
  };

  const isEmpty = organizations.length === 0 && !isLoading && !isFetching;

  // Create organization mutation
  const createOrganization = useMutation({
    mutationFn: (organizationData: Partial<Organization>) => 
      organizationService.create(organizationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization created successfully");
    },
    onError: (error) => {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
    }
  });

  // Update organization mutation
  const updateOrganization = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) => 
      organizationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization updated successfully");
    },
    onError: (error) => {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
    }
  });

  // Delete organization mutation
  const deleteOrganization = useMutation({
    mutationFn: (id: string) => organizationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    }
  });

  return {
    organizations: Array.isArray(organizations) ? organizations : [],
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
