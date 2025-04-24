
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";

export const leadResponseService = {
  getLeadResponses: async (replyId: string): Promise<LeadReply[]> => {
    const response = await api.get(`/api/leadresponses/reply/${replyId}`);
    return response.data.responses;
  },

  createLeadResponse: async (data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.post('/api/leadresponses/', data);
    return response.data;
  },

  updateLeadResponse: async (id: string, data: LeadReplyFormData): Promise<LeadReply> => {
    const response = await api.put(`/api/leadresponses/${id}`, data);
    return response.data;
  },

  deleteLeadResponse: async (id: string): Promise<void> => {
    await api.delete(`/api/leadresponses/${id}`);
  }
};
