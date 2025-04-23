
import { User } from "@/modules/users/types";

export interface LeadReply {
  id: string;
  leadId: string;
  replyText: string;
  replyAt: string;       // Date string
  replier: User;         // Full user object
  leadresponses?: LeadReply[]; // optional, recursive
}

export interface LeadReplyFormData {
  reply: string;
  replierId: string;
  leadId: string;
}
