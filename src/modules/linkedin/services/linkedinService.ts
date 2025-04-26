
import { api } from "@/modules/common/services/api";
import { LinkedInProfile, LinkedInFormValues } from "../types";

export const linkedinService = {
  getAll: async (): Promise<LinkedInProfile[]> => {
    try {
      const response = await api.get('/api/linkedin/');
      return response.data.profiles || [];
    } catch (error) {
      console.error("Error fetching LinkedIn profiles:", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<LinkedInProfile> => {
    try {
      const response = await api.get(`/api/linkedin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (data: LinkedInFormValues): Promise<LinkedInProfile> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...data,
        handledBy: data.handledById ? { id: data.handledById } : undefined,
      };
      
      const response = await api.post('/api/linkedin/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating LinkedIn profile:", error);
      throw error;
    }
  },

  update: async (id: string, data: LinkedInFormValues): Promise<LinkedInProfile> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...data,
        handledBy: data.handledById ? { id: data.handledById } : undefined,
      };

      const response = await api.put(`/api/linkedin/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/linkedin/${id}`);
    } catch (error) {
      console.error(`Error deleting LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  }
};
