
import { User } from "@/modules/users/types";

export interface LeadReply {
  id: string;
  leadId: string;
  replyText: string;
  replyAt: string;       // Date string
  replier: User;         // Full user object
  replierId?: string;    // ID of the replier
  parentReplyId?: string; // ID of parent reply if this is a response
  leadresponses?: {
    id: string;
    replyId: string;
    response: string;
    respondAt: string | null;
  }[]; // Responses array
}

// Form data type
export interface LeadReplyFormData {
  leadId: string;
  replyText: string;
  replyAt: string;
  replierId: string;
  replier: User;
  parentReplyId?: string;
}
