
export interface PaginationMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageSize?: number; // For direct access
  pageNumber?: number;
  last?: boolean;
  first?: boolean;
  numberOfElements?: number;
  sort?: any;
  empty?: boolean;
  offset?: number;
  number?: number;
  // Add these for backward compatibility
  rowsPerPage?: number;
  currentPage?: number; 
  totalItems?: number;
}
