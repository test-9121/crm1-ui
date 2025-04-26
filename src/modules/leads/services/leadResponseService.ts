
import { api } from "@/modules/common/services/api";
import { LeadReply, LeadReplyFormData } from "../types/leadReply";
import { toast } from "@/components/ui/sonner";

export const leadResponseService = {
  getLeadResponses: async (replyId: string): Promise<LeadReply[]> => {
  //   const response = await api.get(`/api/leadresponses/reply/${replyId}`);
  //   return response.data.responses;
  // },

  // createLeadResponse: async (data: any): Promise<any> => {
  //   const response = await api.post('/api/leadresponses/', data);
  //   return response.data;
  // },

  // updateLeadResponse: async (id: string, data: any): Promise<any> => {
  //   const response = await api.put(`/api/leadresponses/${id}`, data);
  //   return response.data;
  // },

  // deleteLeadResponse: async (id: string): Promise<void> => {
  //   await api.delete(`/api/leadresponses/${id}`);
  // }
    try {
      const response = await api.get(`/api/leadresponses/reply/${replyId}`);
      return response.data.responses;
    } catch (error) {
      console.error("Error fetching lead responses:", error);
      toast.error("Failed to load responses");
      throw error; // Re-throw to handle in component
    }
  },

  createLeadResponse: async (data: any): Promise<{ success: boolean; data: any }> => {
    try {
      const response = await api.post('/api/leadresponses/', data);
      toast.success("Response created successfully");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating lead response:", error);
      toast.error("An error occurred");
      return { success: false, data: null };
    }
  },

  updateLeadResponse: async (id: string, data: any): Promise<{ success: boolean; data: any }> => {
    try {
      const response = await api.put(`/api/leadresponses/${id}`, data);
      toast.success("Response updated successfully");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating lead response:", error);
      toast.error("An error occurred");
      return { success: false, data: null };
    }
  },

  deleteLeadResponse: async (id: string): Promise<{ success: boolean }> => {
    try {
      await api.delete(`/api/leadresponses/${id}`);
      toast.success("Response deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error deleting lead response:", error);
      toast.error("An error occurred");
      return { success: false };
    }
  }
};
