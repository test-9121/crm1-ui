
import { User } from "@/modules/users/types";

export interface LeadReply {
  id: string;
  leadId: string;
  replyText: string;
  replyAt: string;       // Date string
  replier: User;         // Full user object
  replierId: string;     // ID of the replier
  parentReplyId?: string; // ID of parent reply if this is a response
  leadresponses?: LeadReply[]; // optional, recursive responses
}

// Remove `id` from create/update payload type - it's only included on backend responses.
export interface LeadReplyFormData {
  leadId: string;
  replyText: string;
  replyAt: string;
  replierId: string;
  replier: User;
  // Parent reply ID for threading/nesting (for responses)
  parentReplyId?: string;
}
