
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { userService } from "@/modules/users/services/userService";
import { designationService } from "@/modules/designations/services/designationService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { industryService } from "@/modules/industries/services/industryService";
import { useState } from "react";
import { PaginationMetadata } from "@/modules/targets/types";
import { User } from "@/modules/users/types";

export const useUsers = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 100 // Get a larger batch for dropdowns
  });

  const {
    data,
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: ["users", pagination.page, pagination.size],
    queryFn: () => userService.getAll(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      }
    }
  });

  // Extract users array whether it's returned directly or in a paginated structure
  const users = Array.isArray(data) ? data : (data?.data || []);

  return { users, loading, refetch };
};

export const useDesignations = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10
  });

  const { 
    data, 
    isLoading: loading,
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ["designations", pagination.page, pagination.size],
    queryFn: () => designationService.getAll(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch designations");
        console.error("Error fetching designations:", error);
      }
    }
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

  return { 
    designations, 
    pagination: paginationData,
    loading: loading || isFetching,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};

export const useOrganizations = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10
  });

  const { 
    data, 
    isLoading: loading,
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ["organizations", pagination.page, pagination.size],
    queryFn: () => organizationService.getAll(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch organizations");
        console.error("Error fetching organizations:", error);
      }
    }
  });

  const organizations = data?.data || [];
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

  return { 
    organizations, 
    pagination: paginationData,
    loading: loading || isFetching,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};

export const useIndustries = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 100 // Get a larger batch for dropdowns
  });

  const { 
    data, 
    isLoading: loading,
    refetch 
  } = useQuery({
    queryKey: ["industries", pagination.page, pagination.size],
    queryFn: () => industryService.getAll(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch industries");
        console.error("Error fetching industries:", error);
      }
    }
  });

  // Extract industries array whether it's returned directly or in a paginated structure
  const industries = Array.isArray(data) ? data : (data?.data || []);

  return { industries, loading, refetch };
};
