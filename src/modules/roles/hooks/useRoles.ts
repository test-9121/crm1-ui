
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "@/modules/roles/services/roleService";
import { Role } from "@/modules/roles/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

export const useRoles = () => {
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
    isFetching,
  } = useQuery({
    queryKey: ["roles", pagination.page, pagination.size],
    queryFn: () => roleService.getAll(pagination.page, pagination.size),
  });

  const roles = data?.data || [];
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
    number: 0,
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({
      page: 0, // Reset to first page when changing page size
      size: newSize,
    });
  };

  const isEmpty = roles.length === 0 && !isLoading && !isFetching;


  const getRoleById = (id: string): Role | undefined => {
    return roles.find(role => role.id === id);
  };

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
    roles: Array.isArray(roles) ? roles : [],
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    handlePageChange,
    handlePageSizeChange,
  };
};
