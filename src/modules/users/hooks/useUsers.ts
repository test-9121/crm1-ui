
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/modules/users/services/userService";
import { User, UserFormData } from "@/modules/users/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { PaginationMetadata } from "@/modules/targets/types";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5
  });
  
  // Fetch all users
  const { 
    data, 
    isLoading, 
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["users", pagination.page, pagination.size],
    queryFn: () => userService.getAll(pagination.page, pagination.size),
  });

  // Handle both paginated and non-paginated responses
  const users = Array.isArray(data) ? data : data?.data || [];
  const paginationData = !Array.isArray(data) && data?.pagination ? data.pagination : {
    pageNumber: 0,
    pageSize: users.length,
    totalElements: users.length,
    totalPages: 1,
    last: true,
    first: true,
    numberOfElements: users.length,
    empty: users.length === 0,
    size: users.length,
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

  // Create a new user
  const createUser = useMutation({
    mutationFn: (userData: UserFormData) => userService.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    },
  });

  // Update an existing user
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormData }) => 
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    },
  });

  // Delete a user
  const deleteUser = useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    },
  });

  // Helper function to get a user by id
  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    isError,
    isEmpty: users.length === 0,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
