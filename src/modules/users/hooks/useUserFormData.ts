
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { userService } from "@/modules/users/services/userService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { Role, Organization } from "@/modules/users/types";
import { useInfiniteScroll } from "@/modules/common/hooks/useInfiniteScroll";
import { adaptOrganizationsForUsers } from "@/modules/common/adapters/organizationAdapter";

export const useUserFormData = () => {
  // Get all roles for the user form
  const { 
    data: rolesData = [], 
    isLoading: isRolesLoading,
    error: rolesError
  } = useQuery({
    queryKey: ["roles-for-form"],
    queryFn: userService.getAllRoles,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch roles");
        console.error("Error fetching roles:", error);
      }
    }
  });

  const roles: Role[] = Array.isArray(rolesData) ? rolesData : [];

  // Use infinite scroll for organizations in dropdowns
  const {
    items: organizationsRaw,
    isLoading: isOrganizationsLoading,
    fetchNextPage: fetchNextOrganizations,
    fetchPreviousPage: fetchPreviousOrganizations,
    hasMore: hasMoreOrganizations,
    error: organizationsError,
    reset: resetOrganizations
  } = useInfiniteScroll<any>({
    queryKey: ["organizations-for-dropdown"],
    fetchFunction: async (page, size) => {
      const result = await organizationService.getAll(page, size);
      // Adapter to convert from organizations module type to users module type
      return {
        data: adaptOrganizationsForUsers(result.data),
        pagination: {
          last: result.pagination.last || result.pagination.number >= result.pagination.totalPages - 1,
          first: result.pagination.first || result.pagination.number <= 0
        }
      };
    },
    pageSize: 100,
    onError: (error) => {
      toast.error("Failed to fetch organizations");
      console.error("Error fetching organizations:", error);
    }
  });

  const organizations: Organization[] = organizationsRaw || [];

  return {
    roles,
    organizations,
    isLoading: isRolesLoading || isOrganizationsLoading,
    error: rolesError || organizationsError,
    fetchNextOrganizations,
    fetchPreviousOrganizations,
    hasMoreOrganizations,
    resetOrganizations
  };
};
