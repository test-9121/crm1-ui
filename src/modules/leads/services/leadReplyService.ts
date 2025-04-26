
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";
import { toast } from "@/components/ui/sonner";

export const leadReplyService = {
  getLeadReplies: async (leadId: string): Promise<LeadReply[]> => {
    try {
      const response = await api.get(`/api/leadreplies/lead/${leadId}`);
      return response.data.leadReplies || [];
    } catch (error) {
      console.error("Error fetching lead replies:", error);
      toast.error("Failed to load replies");
      throw error;
    }
  },

  // getLeadReply: async (id: string): Promise<LeadReply> => {
  //   const response = await api.get(`/api/leadreplies/${id}`);
  //   return response.data;
  // },

  // createLeadReply: async (data: LeadReplyFormData): Promise<LeadReply> => {
  //   const response = await api.post('/api/leadreplies/', data);
  //   return response.data;
  // },

  // updateLeadReply: async (id: string, data: LeadReplyFormData): Promise<LeadReply> => {
  //   const response = await api.put(`/api/leadreplies/${id}`, data);
  //   return response.data;
  // },

  // deleteLeadReply: async (id: string): Promise<void> => {
  //   await api.delete(`/api/leadreplies/${id}`);
  // }

  //   try {
  //     const response = await api.get(`/api/leadreplies/lead/${leadId}`);
  //     return response.data.replies || [];
  //   } catch (error) {
  //     console.error("Error fetching lead replies:", error);
  //     toast.error("Failed to load replies");
  //     return [];
  //   }
  // },

  getLeadReply: async (id: string): Promise<LeadReply | null> => {
    try {
      const response = await api.get(`/api/leadreplies/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lead reply:", error);
      toast.error("Failed to load reply details");
      return null;
    }
  },

  createLeadReply: async (data: LeadReplyFormData): Promise<{ success: boolean; data: any }> => {
    try {
      const response = await api.post('/api/leadreplies/', data);
      toast.success("Reply created successfully");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating lead reply:", error);
      toast.error("An error occurred");
      return { success: false, data: null };
    }
  },

  updateLeadReply: async (id: string, data: Partial<LeadReplyFormData>): Promise<{ success: boolean; data: any }> => {
    try {
      const response = await api.put(`/api/leadreplies/${id}`, data);
      toast.success("Reply updated successfully");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating lead reply:", error);
      toast.error("An error occurred");
      return { success: false, data: null };
    }
  },

  deleteLeadReply: async (id: string): Promise<{ success: boolean }> => {
    try {
      await api.delete(`/api/leadreplies/${id}`);
      toast.success("Reply deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error deleting lead reply:", error);
      toast.error("An error occurred");
      return { success: false };
    }
  }

};
