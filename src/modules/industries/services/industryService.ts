
import { api } from "@/modules/common/services/api";
import { Industry } from "@/modules/leads/types";
import { toast } from "@/components/ui/sonner";

export const industryService = {
  getAll: async (): Promise<Industry[]> => {
    try {
      const response = await api.get('/api/industries');
      const data = response.data;
      
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.industries && Array.isArray(data.industries)) {
        return data.industries;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching industries:", error);
      toast.error("An error occurred. Please try again.");
      return [];
    }
  },
  
  getById: async (id: string): Promise<Industry> => {
    try {
      const response = await api.get(`/api/industries/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  create: async (industryData: Partial<Industry>): Promise<Industry> => {
    try {
      const response = await api.post('/api/industries/', industryData);
      toast.success("Created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  update: async (id: string, industryData: Partial<Industry>): Promise<Industry> => {
    try {
      const response = await api.put(`/api/industries/${id}`, industryData);
      toast.success("Updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/industries/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  }
};
