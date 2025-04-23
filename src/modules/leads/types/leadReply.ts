
import { User } from "@/modules/users/types";

export interface LeadReply {
  id: string;
  leadId: string;
  replyText: string;
  replyAt: string;       // Date string
  replier: User;         // Full user object
  replierId: string;     // ID of the replier
  leadresponses?: LeadReply[]; // optional, recursive
}

// Remove `id` from create/update payload type - it's only included on backend responses.
export interface LeadReplyFormData {
  leadId: string;
  replyText: string;
  replyAt: string;
  replierId: string;
  replier: User;
  // You might want to add a parentReplyId for threading/nesting (if supported)
  parentReplyId?: string;
}
