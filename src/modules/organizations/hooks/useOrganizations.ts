
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { Organization } from "@/modules/organizations/types";
import { toast } from "@/components/ui/sonner";

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const { 
    data = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationService.getAll,
  });

  const getOrganizationById = (id: string): Organization | undefined => {
    return data.find(org => org.id === id);
  };

  const isEmpty = data.length === 0 && !isLoading;

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
    organizations: data,
    isLoading,
    error,
    isEmpty,
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization
  };
};
