
import { User } from "@/modules/users/types";
import { Organization } from "@/modules/organizations/types";

export type TargetStatus = 'Active' | 'InActive' | 'OnHold';

export interface Target {
  id: string;
  accountName: string;
  connectionsCount: number;
  handledById: User | string; 
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
