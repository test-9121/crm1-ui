
import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";

type FetchFunctionType<T> = (page: number, size: number) => Promise<{ data: T[], pagination: { last: boolean, first: boolean } }>;

export function useInfiniteScroll<T>({
  queryKey,
  fetchFunction,
  pageSize = 100,
  onError
}: {
  queryKey: string[],
  fetchFunction: FetchFunctionType<T>,
  pageSize?: number,
  onError?: (error: Error) => void
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [allItems, setAllItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const isFetchingRef = useRef(false);

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: [...queryKey, currentPage, pageSize],
    queryFn: () => fetchFunction(currentPage, pageSize),
    meta: {
      onError: (error: Error) => {
        isFetchingRef.current = false;
        
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

  // Handle successful query results
  if (data) {
    if (currentPage === 0 && allItems.length === 0) {
      setAllItems(data.data || []);
    } else if (currentPage > 0 && !allItems.some(item => data.data.includes(item as any))) {
      // Only append items that aren't already in the list
      setAllItems(prev => [...prev, ...(data.data || [])]);
    }
    
    if (!hasMore && !data.pagination.last) {
      setHasMore(true);
    } else if (hasMore && data.pagination.last) {
      setHasMore(false);
    }
    
    if (isFirstPage !== data.pagination.first) {
      setIsFirstPage(data.pagination.first);
    }
    
    if (isFetchingRef.current) {
      isFetchingRef.current = false;
    }
  }

  const fetchNextPage = useCallback(() => {
    if (!hasMore || isFetchingRef.current || isLoading || isFetching) return;
    
    isFetchingRef.current = true;
    setCurrentPage(prev => prev + 1);
  }, [hasMore, isLoading, isFetching]);

  const fetchPreviousPage = useCallback(() => {
    if (isFirstPage || isFetchingRef.current || isLoading || isFetching) return;
    
    isFetchingRef.current = true;
    setCurrentPage(prev => Math.max(0, prev - 1));
  }, [isFirstPage, isLoading, isFetching]);

  const reset = useCallback(() => {
    setCurrentPage(0);
    setAllItems([]);
    setHasMore(true);
    setIsFirstPage(true);
  }, []);

  return {
    items: allItems,
    isLoading: isLoading || isFetching,
    error,
    hasMore,
    isFirstPage,
    fetchNextPage,
    fetchPreviousPage,
    reset,
    refetch
  };
}
