
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { targetService } from "@/modules/targets/services/targetService";
import { Target } from "@/modules/targets/types";
import { toast } from "@/components/ui/sonner";

export const useTargets = () => {
  const queryClient = useQueryClient();

  const { 
    data = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["targets"],
    queryFn: targetService.getAll,
  });

  const getTargetById = (id: string): Target | undefined => {
    return data.find(target => target.id === id);
  };

  const isEmpty = data.length === 0 && !isLoading;

  // Create target mutation
  const createTarget = useMutation({
    mutationFn: (targetData: Partial<Target>) => 
      targetService.create(targetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["targets"] });
      toast.success("Target created successfully");
    },
    onError: (error) => {
      console.error("Error creating target:", error);
      toast.error("Failed to create target");
    }
  });

  // Update target mutation
  const updateTarget = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Target> }) => 
      targetService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["targets"] });
      toast.success("Target updated successfully");
    },
    onError: (error) => {
      console.error("Error updating target:", error);
      toast.error("Failed to update target");
    }
  });

  // Delete target mutation
  const deleteTarget = useMutation({
    mutationFn: (id: string) => targetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["targets"] });
      toast.success("Target deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting target:", error);
      toast.error("Failed to delete target");
    }
  });

  return {
    targets: Array.isArray(data) ? data : [],
    isLoading,
    error,
    isEmpty,
    getTargetById,
    createTarget,
    updateTarget,
    deleteTarget
  };
};
