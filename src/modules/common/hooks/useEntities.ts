
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { userService } from "@/modules/users/services/userService";
import { designationService } from "@/modules/designations/services/designationService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { industryService } from "@/modules/industries/services/industryService";

export const useUsers = () => {
  const { data: users = [], isLoading: loading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      }
    }
  });

  return { users, loading };
};

export const useDesignations = () => {
  const { data: designations = [], isLoading: loading } = useQuery({
    queryKey: ["designations"],
    queryFn: designationService.getAll,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch designations");
        console.error("Error fetching designations:", error);
      }
    }
  });

  return { designations, loading };
};

export const useOrganizations = () => {
  const { data: organizations = [], isLoading: loading } = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationService.getAll,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch organizations");
        console.error("Error fetching organizations:", error);
      }
    }
  });

  return { organizations, loading };
};

export const useIndustries = () => {
  const { data: industries = [], isLoading: loading } = useQuery({
    queryKey: ["industries"],
    queryFn: industryService.getAll,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch industries");
        console.error("Error fetching industries:", error);
      }
    }
  });

  return { industries, loading };
};
