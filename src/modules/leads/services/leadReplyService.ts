
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";

export const leadReplyService = {
  getLeadReplies: async (leadId: string): Promise<LeadReply[]> => {
    // Updated endpoint path as requested
    const response = await api.get(`/api/leadreplies/lead/${leadId}`);
    return response.data.leadReplies;
  },

  createLeadReply: async (data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.post('/api/leads/replies', data);
    return response.data;
  },

  deleteLeadReply: async (id: string): Promise<void> => {
    await api.delete(`/api/leads/replies/${id}`);
  }
};
