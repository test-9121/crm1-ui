
export interface PaginationMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageSize?: number; // Adding this to support direct access
  pageNumber?: number;
  last?: boolean;
  first?: boolean;
  numberOfElements?: number;
  // Include other properties that might be required
  sort?: any;
  empty?: boolean;
  offset?: number;
}
