
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/modules/users/services/userService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { Role, Organization } from "@/modules/users/types";

export const useUserFormData = () => {
  const { 
    data: roles = [], 
    isLoading: isRolesLoading,
    error: rolesError
  } = useQuery({
    queryKey: ["roles"],
    queryFn: userService.getAllRoles,
  });

  const { 
    data: organizations = [],
    isLoading: isOrganizationsLoading,
    error: organizationsError
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationService.getAll, // Using organizationService instead
  });

  return {
    roles,
    organizations,
    isLoading: isRolesLoading || isOrganizationsLoading,
    error: rolesError || organizationsError
  };
};
