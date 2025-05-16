import { ILead } from "@/modules/leads/types";
import { Organization } from "@/modules/organizations/types";

export type DealStage = 
  | "PROSPECTING" 
  | "LEAD" 
  | "DISCOVERY" 
  | "PROPOSAL" 
  | "NEGOTIATION" 
  | "CLOSED_WON" 
  | "CLOSED_LOST";

export type DealStatus = "ACTIVE" | "INACTIVE" | "ON_HOLD";
export type DealPriority = "LOW" | "MEDIUM" | "HIGH";
export type DealSource = 
  | "WEBSITE" 
  | "REFERRAL" 
  | "COLD_CALL" 
  | "EMAIL" 
  | "SOCIAL_MEDIA" 
  | "EVENT" 
  | "OTHER";

export interface DealFilters {
  stage?: string[];
  status?: string[];
  priority?: string[];
  minValue?: string;
  maxValue?: string;
}

export interface Deal {
  id: string;
  createdDateTime?: string;
  lastUpdatedDateTime?: string;
  name: string;
  leads?: ILead;
  email?: string;
  stage: DealStage;
  value: number;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  status: DealStatus;
  priority: DealPriority;
  source: DealSource;
  nextStep?: string;
  notes?: string;
  organization?: Organization;
  probability?: number;
}

export interface DealFormValues {
  name: string;
  leadId?: string;
  email?: string;
  stage: DealStage;
  value: number;
  expectedCloseDate?: Date | null;
  actualCloseDate?: Date | null;
  status: DealStatus;
  priority: DealPriority;
  source: DealSource;
  nextStep?: string;
  notes?: string;
  organizationId?: string;
  probability?: number;
}

export interface DealStats {
  totalPipelineValue: number;
  weightedPipelineValue: number;
  dealsWonThisMonth: {
    count: number;
    value: number;
  };
  avgDealSize: {
    value: number;
    percentChange: number;
  };
  totalDeals: number;
}
