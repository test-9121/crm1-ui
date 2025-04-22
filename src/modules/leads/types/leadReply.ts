
import { User } from "@/modules/users/types";

export interface LeadReply {
  id: string;
  leadId: string;
  reply: string;
  replyDate: string;
  replier: User;
  replierId: string;
}

export interface LeadReplyFormData {
  reply: string;
  replierId: string;
  leadId: string;
}
