
import { useQuery } from "@tanstack/react-query";
import { leadService } from "@/modules/leads/services/leadService";
import { ILead } from "@/modules/leads/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { PaginationMetadata } from "@/modules/targets/types";

export function useLeads() {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["leads", pagination.page, pagination.size],
    queryFn: () => leadService.getLeads(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch leads. Please try again later.");
        console.error("Error fetching leads:", error);
      }
    }
  });

  const {
    data: allLeads = [],
  } = useQuery({
    queryKey: ["leads"],
    queryFn: leadService.getAllLeads,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch leads. Please try again later.");
        console.error("Error fetching leads:", error);
      }
    }
  });

  // Handle both paginated and non-paginated responses
  const leads = Array.isArray(data) ? data : data?.data || [];
  
  // const allLeads = Array.isArray(data) ? data : data?.data || [];

  const paginationData = !Array.isArray(data) && data?.pagination ? data.pagination : {
    pageNumber: 0,
    pageSize: leads.length,
    totalElements: leads.length,
    totalPages: 1,
    last: true,
    first: true,
    numberOfElements: leads.length,
    empty: leads.length === 0,
    size: leads.length,
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

  // Function to find a specific lead by ID
  const getLeadById = (id: string): ILead | undefined => {
    return leads.find(lead => lead.id === id);
  };

  return {
    allLeads,
    leads,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    isError,
    error,
    isEmpty: !isLoading && leads.length === 0,
    getLeadById,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
}
