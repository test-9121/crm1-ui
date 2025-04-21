
import { Organization } from "@/modules/organizations/types";

export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'On Hold';

export interface Project {
  id: string;
  name: string;
  description: string;
  organization: Organization;
  status?: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
}

export interface ProjectFormValues {
  name: string;
  description: string;
  organizationId: string;
  status: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
}
