
import { api } from "@/modules/common/services/api";
import { CMSMail, CMSMailFormValues } from "../types";

export const cmsMailService = {
  getAll: async (): Promise<CMSMail[]> => {
    try {
      const response = await api.get('/api/cms-mails/');
      return response.data.cmsMail || [];
    } catch (error) {
      console.error("Error fetching CMS mails:", error);
      throw error;
    }
  },
  
  getById: async (id: string): Promise<CMSMail> => {
    try {
      const response = await api.get(`/api/cms-mails/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching CMS mail with ID ${id}:`, error);
      throw error;
    }
  },
  
  create: async (mailData: CMSMailFormValues): Promise<CMSMail> => {
    try {
      const response = await api.post('/api/cms-mails/', mailData);
      return response.data;
    } catch (error) {
      console.error("Error creating CMS mail:", error);
      throw error;
    }
  },
  
  update: async (id: string, mailData: CMSMailFormValues): Promise<CMSMail> => {
    try {
      const response = await api.put(`/api/cms-mails/${id}`, mailData);
      return response.data;
    } catch (error) {
      console.error(`Error updating CMS mail with ID ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/cms-mails/${id}`);
    } catch (error) {
      console.error(`Error deleting CMS mail with ID ${id}:`, error);
      throw error;
    }
  }
};
