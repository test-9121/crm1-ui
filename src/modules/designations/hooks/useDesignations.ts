
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { designationService } from "@/modules/designations/services/designationService";
import { Designation } from "@/modules/leads/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { PaginationMetadata } from "@/modules/targets/types";

export const useDesignations = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10
  });

  const { 
    data, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["designations", pagination.page, pagination.size],
    queryFn: () => designationService.getAll(pagination.page, pagination.size),
  });

  const designations = data?.data || [];
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

  const getDesignationById = (id: string): Designation | undefined => {
    return designations.find(designation => designation.id === id);
  };

  const isEmpty = designations.length === 0 && !isLoading && !isFetching;

  // Create designation mutation
  const createDesignation = useMutation({
    mutationFn: (designationData: Partial<Designation>) => 
      designationService.create(designationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
      toast.success("Designation created successfully");
    },
    onError: (error) => {
      console.error("Error creating designation:", error);
      toast.error("Failed to create designation");
    }
  });

  // Update designation mutation
  const updateDesignation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Designation> }) => 
      designationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
      toast.success("Designation updated successfully");
    },
    onError: (error) => {
      console.error("Error updating designation:", error);
      toast.error("Failed to update designation");
    }
  });

  // Delete designation mutation
  const deleteDesignation = useMutation({
    mutationFn: (id: string) => designationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
      toast.success("Designation deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting designation:", error);
      toast.error("Failed to delete designation");
    }
  });

  return {
    designations,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getDesignationById,
    createDesignation,
    updateDesignation,
    deleteDesignation,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
