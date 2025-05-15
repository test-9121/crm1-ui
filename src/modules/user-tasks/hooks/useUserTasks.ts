
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userTaskService } from "@/modules/user-tasks/services/userTaskService";
import { UserTask } from "@/modules/user-tasks/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

export const useUserTasks = () => {
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
    queryKey: ["userTasks", pagination.page, pagination.size],
    queryFn: () => userTaskService.getAll(pagination.page, pagination.size),
  });

  const userTasks = data?.data || [];
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

  const getUserTaskById = (id: string): UserTask | undefined => {
    return userTasks.find(userTask => userTask.id === id);
  };

  const isEmpty = userTasks.length === 0 && !isLoading && !isFetching;

  // Create user task mutation
  const createUserTask = useMutation({
    mutationFn: (userTaskData: Partial<UserTask>) => 
      userTaskService.create(userTaskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      toast.success("User task created successfully");
    },
    onError: (error) => {
      console.error("Error creating user task:", error);
      toast.error("Failed to create user task");
    }
  });

  // Update user task mutation
  const updateUserTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserTask> }) => 
      userTaskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      toast.success("User task updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user task:", error);
      toast.error("Failed to update user task");
    }
  });

  // Delete user task mutation
  const deleteUserTask = useMutation({
    mutationFn: (id: string) => userTaskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      toast.success("User task deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user task:", error);
      toast.error("Failed to delete user task");
    }
  });

  return {
    userTasks,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getUserTaskById,
    createUserTask,
    updateUserTask,
    deleteUserTask,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
