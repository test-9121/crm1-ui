
import { User } from "@/modules/users/types";
import { Organization } from "@/modules/organizations/types";

export type TargetStatus = 'Active' | 'InActive' | 'OnHold';

export interface Target {
  id: string;
  accountName: string;
  connectionsCount: number;
  handledById?: string; 
  handledBy: User;
  noOfLeadsIdentified: number;
  connectionsSent: number;
  messagesSent: number;
  status: TargetStatus;
  followUps: number;
  createdDate: string;
  inMailCount: number;
  postings: number;
  meetingsScheduled: number;
  responseReceived: string | boolean;
  organization: Organization;
  createdDateTime?: string;
  lastUpdatedDateTime?: string | null;
}

export interface PaginationMetadata {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  size: number;
  number: number;
}

export interface PagedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
