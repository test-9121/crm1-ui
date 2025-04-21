
import { Organization } from "@/modules/organizations/types";
import { User } from "@/modules/users/types";

export interface LinkedInProfile {
  id: string;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  accountName: string;
  email: string;
  password?: string;
  designation: string;
  country: string;
  connectionsCount: number;
  status: string;
  handledBy: User;
  organization: Organization;
  
  // Additional fields referenced in components
  headline?: string;
  company?: string;
  currentPosition?: string;
  location?: string;
  industry?: string;
  connections?: number;
  userId?: string;
  profileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkedInFormValues {
  accountName: string;
  email: string;
  password?: string;
  designation: string;
  country: string;
  connectionsCount: number;
  status: string;
  handledById: string;
  organizationId: string;
}
