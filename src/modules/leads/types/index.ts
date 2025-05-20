
export interface Industry {
  id: string;
  name: string;
  description?: string | null;
}

export interface Designation {
  id: string;
  name: string;
  description?: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  zipCode?: string | null;
  phoneNumber?: string | null;
  company?: string | null;
  avatarUrl?: string | null;
  status?: string | null;
  verified: boolean;
  emailVerified: boolean;
  roleId?: string | null;
  organizationId?: string | null;
}

export interface Organization {
  id: string;
  name: string;
  description?: string | null;
  domain: string;
  logoImgSrc?: string | null;
  disabled: boolean;
}

export type Status = 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won' | 'Unqualified';
export type Empcount = 'Self Employed'|'0-10'|'11-50'|'51-100' | '101-200' | '201-500' | '501-1,000' | '1,001-2,000' | '2,001-3,000'|'3,001-5,000'|'5,001-10,000'|'10,001+';

export interface ILead {
  id: string;
  firstname: string;
  lastname: string;
  industry: Industry;
  email: string;
  phoneNumber: string;
  status: Status;
  leaddate?: string;
  linkedin?: string;
  website?: string;
  region?: string;
  empCount?: Empcount;
  verified: boolean;
  messageSent: boolean;
  comments?: string;
  leadReplies: any[]; // Update with proper type if needed
  leadTasks: any[]; // Update with proper type if needed
  sentBy: User;
  sentById: string;
  organization: Organization;
  organizationId: string;
  designation: Designation;
  designationId: string;
  draftStatus: boolean;
}
