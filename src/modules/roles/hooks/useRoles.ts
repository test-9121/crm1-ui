
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "@/modules/roles/services/roleService";
import { Role } from "@/modules/roles/types";
import { toast } from "@/components/ui/sonner";

export const useRoles = () => {
  const queryClient = useQueryClient();

  const { 
    data = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAll,
  });

  const getRoleById = (id: string): Role | undefined => {
    return data.find(role => role.id === id);
  };

  const isEmpty = data.length === 0 && !isLoading;

  // Create role mutation
  const createRole = useMutation({
    mutationFn: (roleData: Partial<Role>) => 
      roleService.create(roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      toast.error("Failed to create role");
    }
  });

  // Update role mutation
  const updateRole = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) => 
      roleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role updated successfully");
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  });

  // Delete role mutation
  const deleteRole = useMutation({
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    }
  });

  return {
    roles: Array.isArray(data) ? data : [],
    isLoading,
    error,
    isEmpty,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
  };
};
