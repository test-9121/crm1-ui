
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginationMetadata } from "@/modules/targets/types";
import { toast } from "@/components/ui/sonner";

type FetchFunctionType<T> = (page: number, size: number) => Promise<{ data: T[], pagination: PaginationMetadata }>;

export function usePaginatedData<T>({
  queryKey,
  fetchFunction,
  initialPage = 0,
  initialPageSize = 10,
  onError
}: {
  queryKey: string[],
  fetchFunction: FetchFunctionType<T>,
  initialPage?: number,
  initialPageSize?: number,
  onError?: (error: Error) => void
}) {
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: initialPageSize
  });

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: [...queryKey, pagination.page, pagination.size],
    queryFn: () => fetchFunction(pagination.page, pagination.size),
    meta: {
      onError: (error: Error) => {
        const defaultErrorHandler = () => {
          toast.error(`Failed to fetch ${queryKey[0]}`);
          console.error(`Error fetching ${queryKey[0]}:`, error);
        };
        
        if (onError) {
          onError(error);
        } else {
          defaultErrorHandler();
        }
      }
    }
  });

  const items = data?.data || [];
  const paginationData = data?.pagination || {
    pageNumber: 0,
    pageSize: initialPageSize,
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
    numberOfElements: 0,
    empty: true,
    size: initialPageSize,
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

  const isEmpty = items.length === 0 && !isLoading && !isFetching;

  return {
    items,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    handlePageChange,
    handlePageSizeChange,
    refetch,
    currentPage: pagination.page,
    pageSize: pagination.size
  };
}
