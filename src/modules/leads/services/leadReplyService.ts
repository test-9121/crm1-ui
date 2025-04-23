
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";

export const leadReplyService = {
  getLeadReplies: async (leadId: string): Promise<LeadReply[]> => {
    // Updated to use /api/lead/{leadId} rather than /api/leads/{leadId}/replies
    const response = await api.get(`/api/lead/${leadId}`);
    return response.data;
  },

  createLeadReply: async (data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.post('/api/leads/replies', data);
    return response.data;
  },

  deleteLeadReply: async (id: string): Promise<void> => {
    await api.delete(`/api/leads/replies/${id}`);
  }
};
