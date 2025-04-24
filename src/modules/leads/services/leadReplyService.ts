
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";

export const leadReplyService = {
  getLeadReplies: async (leadId: string): Promise<LeadReply[]> => {
    const response = await api.get(`/api/leadreplies/lead/${leadId}`);
    return response.data.leadReplies;
  },

  getLeadReply: async (id: string): Promise<LeadReply> => {
    const response = await api.get(`/api/leadreplies/${id}`);
    return response.data;
  },

  createLeadReply: async (data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.post('/api/leadreplies/', data);
    return response.data;
  },

  updateLeadReply: async (id: string, data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.put(`/api/leadreplies/${id}`, data);
    return response.data;
  },

  deleteLeadReply: async (id: string): Promise<void> => {
    await api.delete(`/api/leadreplies/${id}`);
  }
};
