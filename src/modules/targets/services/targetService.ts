
import { api } from "@/modules/common/services/api";
import { Target } from "../types";

export const targetService = {
  getAll: async (): Promise<Target[]> => {
    try {
      const response = await api.get('/api/targets/');
      return response.data.targets || response.data;
    } catch (error) {
      console.error("Error fetching targets, using mock data:", error);
      return [];
    }
  },

  getById: async (id: string): Promise<Target> => {
    const response = await api.get(`/api/targets/${id}`);
    return response.data;
  },

  create: async (targetData: Partial<Target>): Promise<Target> => {
    try {
      const payload = {
        ...targetData,
        // Handle handledBy relationship using handledById
        handledBy: targetData.handledById ? { id: targetData.handledById } : undefined,
      };

      const response = await api.post('/api/targets/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating target:", error);
      throw error;
    }
  },

  update: async (id: string, targetData: Partial<Target>): Promise<Target> => {
    try {
      const payload = {
        ...targetData,
        // Handle handledBy relationship using handledById
        handledBy: targetData.handledById ? { id: targetData.handledById } : undefined,
      };

      const response = await api.put(`/api/targets/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating target with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/targets/${id}`);
  }
};
