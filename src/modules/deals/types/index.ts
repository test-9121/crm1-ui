
import { ILead } from "@/modules/leads/types";
import { Organization } from "@/modules/organizations/types";

export type DealStage = 
  'LEAD' | 
  'DISCOVERY' | 
  'PROPOSAL' | 
  'NEGOTIATION' | 
  'CLOSED_WON' | 
  'CLOSED_LOST' | 
  'PROSPECTING';

export type DealStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
export type DealPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type DealSource = 'WEBSITE' | 'REFERRAL' | 'COLD_CALL' | 'EVENT' | 'OTHER';

export interface Deal {
  id: string;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  name: string;
  leads: ILead;
  email: string;
  stage: DealStage;
  value: number;
  expectedCloseDate: string;
  actualCloseDate: string | null;
  status: DealStatus;
  priority: DealPriority;
  source: DealSource;
  nextStep: string;
  notes: string;
  organization: Organization;
  probability?: number;
}

export interface DealStats {
  totalPipelineValue: number;
  weightedPipelineValue: number;
  dealsWonThisMonth: number;
  dealsWonValue: number;
  avgDealSize: number;
  percentChange: number;
  totalActiveDeals: number;
}

export interface DealFormValues {
  name: string;
  leadId: string;
  email: string;
  stage: DealStage;
  value: number;
  expectedCloseDate: string;
  status: DealStatus;
  priority: DealPriority;
  source: DealSource;
  nextStep: string;
  notes: string;
  probability?: number;
}
