
import { User } from "@/modules/users/types";
import { ILead } from "@/modules/leads/types";
import { Organization } from "@/modules/organizations/types";

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Canceled';

export interface UserTask {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  user: User;
  lead?: ILead;
  organization: Organization;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
}
