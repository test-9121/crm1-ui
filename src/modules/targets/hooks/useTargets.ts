
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { targetService } from "@/modules/targets/services/targetService";
import { Target } from "@/modules/targets/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

// export const useTargets = () => {
//   const queryClient = useQueryClient();
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 5
//   });

//   const { 
//     data, 
//     isLoading, 
//     error,
//     refetch,
//     isFetching
//   } = useQuery({
//     queryKey: ["targets", pagination.page, pagination.size],
//     queryFn: () => targetService.getAll(pagination.page, pagination.size),
//   });

//   const targets = data?.data || [];
//   const paginationData = data?.pagination || {
//     pageNumber: 0,
//     pageSize: 10,
//     totalElements: 0,
//     totalPages: 0,
//     last: true,
//     first: true,
//     numberOfElements: 0,
//     empty: true,
//     size: 10,
//     number: 0
//   };

//   const handlePageChange = (newPage: number) => {
//     setPagination(prev => ({
//       ...prev,
//       page: newPage
//     }));
//   };

//   const handlePageSizeChange = (newSize: number) => {
//     setPagination({
//       page: 0, // Reset to first page when changing page size
//       size: newSize
//     });
//   };

//   const getTargetById = (id: string): Target | undefined => {
//     return targets.find(target => target.id === id);
//   };

//   const isEmpty = targets.length === 0 && !isLoading && !isFetching;

//   // Create target mutation
//   const createTarget = useMutation({
//     mutationFn: (targetData: Partial<Target>) => 
//       targetService.create(targetData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["targets"] });
//       toast.success("Target created successfully");
//     },
//     onError: (error) => {
//       console.error("Error creating target:", error);
//       toast.error("Failed to create target");
//     }
//   });

//   // Update target mutation
//   const updateTarget = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: Partial<Target> }) => 
//       targetService.update(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["targets"] });
//       toast.success("Target updated successfully");
//     },
//     onError: (error) => {
//       console.error("Error updating target:", error);
//       toast.error("Failed to update target");
//     }
//   });

//   // Delete target mutation
//   const deleteTarget = useMutation({
//     mutationFn: (id: string) => targetService.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["targets"] });
//       toast.success("Target deleted successfully");
//     },
//     onError: (error) => {
//       console.error("Error deleting target:", error);
//       toast.error("Failed to delete target");
//     }
//   });

//   return {
//     targets,
//     pagination: paginationData,
//     isLoading: isLoading || isFetching,
//     error,
//     isEmpty,
//     getTargetById,
//     createTarget,
//     updateTarget,
//     deleteTarget,
//     handlePageChange,
//     handlePageSizeChange,
//     refetch
//   };
// };


export const useTargets = () => {
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
    queryKey: ["targets", pagination.page, pagination.size],
    queryFn: () => targetService.getAll(pagination.page, pagination.size),
    // Only refetch when pagination changes
    // Disable refetch when editing
  });

  const targets =  Array.isArray(data) ? data : data?.data || [];
  const paginationData = !Array.isArray(data) && data?.pagination ? data.pagination: {
    pageNumber: 0,
    pageSize: targets.length,
    totalElements: targets.length,
    totalPages: 1,
    last: true,
    first: true,
    numberOfElements: targets.length,
    empty: targets.length === 0,
    size: targets.length,
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

  const getTargetById = (id: string): Target | undefined => {
    return targets.find(target => target.id === id);
  };

  const isEmpty = targets.length === 0 && !isLoading && !isFetching;

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
    targets,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getTargetById,
    createTarget,
    updateTarget,
    deleteTarget,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
