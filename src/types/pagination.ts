
export interface PaginationMetadata {
  // Standard pagination properties
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  
  // For direct access (some APIs use these names)
  pageSize?: number;
  pageNumber?: number;
  
  // Spring/Java pagination properties
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
