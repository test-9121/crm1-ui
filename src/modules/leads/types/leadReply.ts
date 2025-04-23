
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

export interface LeadReplyFormData {
  id: string;
  leadId: string;
  replyText: string;
  replyAt: string;
  replierId: string;
  replier: User;
}
