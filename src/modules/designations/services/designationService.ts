
import { api } from "@/modules/common/services/api";
import { Designation } from "@/modules/leads/types"; // We'll import from leads/types for now to avoid duplication

export const designationService = {
  getAll: async (): Promise<Designation[]> => {
    const response = await api.get('/api/designations/');
    const data = response.data;
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && data.designations && Array.isArray(data.designations)) {
      return data.designations;
    }
    
    return [];
  },
  
  getById: async (id: string): Promise<Designation> => {
    const response = await api.get(`/api/designations/${id}`);
    return response.data;
  },
  
  create: async (designationData: Partial<Designation>): Promise<Designation> => {
    const response = await api.post('/api/designations/', designationData);
    return response.data;
  },
  
  update: async (id: string, designationData: Partial<Designation>): Promise<Designation> => {
    const response = await api.put(`/api/designations/${id}`, designationData);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/designations/${id}`);
  }
};
