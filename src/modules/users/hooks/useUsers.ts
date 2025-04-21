
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/modules/users/services/userService";
import { User, UserFormData } from "@/modules/users/types";
import { toast } from "@/components/ui/sonner";

export const useUsers = () => {
  const queryClient = useQueryClient();
  
  // Fetch all users
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

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

  // Ensure usersArray is always a valid array
  const usersArray = Array.isArray(data) ? data : [];

  // Helper function to get a user by id
  const getUserById = (id: string): User | undefined => {
    return usersArray.find(user => user.id === id);
  };

  return {
    users: usersArray, // Ensure users is always an array
    isLoading,
    isError,
    isEmpty: usersArray.length === 0,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };
};
