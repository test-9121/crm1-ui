
import { Organization } from "@/modules/organizations/types";
import { Deal } from "@/modules/deals/types";
import { ILead } from "@/modules/leads/types";
import { User } from "@/modules/users/types";

export type ContactStatus = 'Active' | 'Inactive' | 'On Hold';

export interface ContactNote {
  id: string;
  content: string;
  createdDateTime: string;
  createdBy: User;
  updatedDateTime?: string;
}

export interface ContactTask {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Deferred';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo?: User;
  createdDateTime: string;
  createdBy: User;
  updatedDateTime?: string;
}

export interface ContactInteraction {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Other';
  subject: string;
  description: string;
  date: string;
  duration?: number; // in minutes
  outcome?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  createdBy: User;
  createdDateTime: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  accountId?: string;
  account?: Account;
  status: ContactStatus;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedin?: string;
  twitter?: string;
  source?: string;
  createdDateTime: string;
  lastUpdatedDateTime?: string;
  assignedToId?: string;
  assignedTo?: User;
  notes?: ContactNote[];
  tasks?: ContactTask[];
  interactions?: ContactInteraction[];
  deals?: Deal[];
  isLead?: boolean;
  leadId?: string;
  lead?: ILead;
}

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  accountId?: string;
  status: ContactStatus;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedin?: string;
  twitter?: string;
  source?: string;
  assignedToId?: string;
  isLead?: boolean;
  leadId?: string;
}

export interface Account {
  id: string;
  name: string;
  industry?: string;
  annualRevenue?: number;
  employeeCount?: number;
  website?: string;
  phone?: string;
  type?: string;
  status: 'Active' | 'Inactive' | 'On Hold';
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedin?: string;
  twitter?: string;
  description?: string;
  createdDateTime: string;
  lastUpdatedDateTime?: string;
  assignedToId?: string;
  assignedTo?: User;
  contacts?: Contact[];
  deals?: Deal[];
  organizationId?: string;
  organization?: Organization;
  notes?: AccountNote[];
  activities?: AccountActivity[];
}

export interface AccountNote {
  id: string;
  content: string;
  createdDateTime: string;
  createdBy: User;
  updatedDateTime?: string;
}

export interface AccountActivity {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Note' | 'Task' | 'Deal';
  title: string;
  description?: string;
  date: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  createdBy: User;
  createdDateTime: string;
}

export interface AccountFormValues {
  name: string;
  industry?: string;
  annualRevenue?: number;
  employeeCount?: number;
  website?: string;
  phone?: string;
  type?: string;
  status: 'Active' | 'Inactive' | 'On Hold';
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  linkedin?: string;
  twitter?: string;
  description?: string;
  assignedToId?: string;
  organizationId?: string;
}
