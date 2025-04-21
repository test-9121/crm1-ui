
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userTaskService } from "@/modules/user-tasks/services/userTaskService";
import { UserTask } from "@/modules/user-tasks/types";
import { toast } from "@/components/ui/sonner";

export const useUserTasks = () => {
  const queryClient = useQueryClient();

  const { 
    data = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["userTasks"],
    queryFn: userTaskService.getAll,
  });

  const getUserTaskById = (id: string): UserTask | undefined => {
    return data.find(userTask => userTask.id === id);
  };

  const isEmpty = data.length === 0 && !isLoading;

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
    userTasks: Array.isArray(data) ? data : [],
    isLoading,
    error,
    isEmpty,
    getUserTaskById,
    createUserTask,
    updateUserTask,
    deleteUserTask
  };
};
