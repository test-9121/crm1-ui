
import { api } from "@/modules/common/services/api";
import { Organization } from "@/modules/organizations/types";

export const organizationService = {
  getAll: async (): Promise<Organization[]> => {
    try {
      const response = await api.get('/api/organization/');
      const data = response.data;
      
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.organizations && Array.isArray(data.organizations)) {
        return data.organizations;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Organization> => {
    const response = await api.get(`/api/organization/${id}`);
    return response.data;
  },
  
  create: async (organizationData: Partial<Organization>): Promise<Organization> => {
    const response = await api.post('/api/organization/', organizationData);
    return response.data;
  },
  
  update: async (id: string, organizationData: Partial<Organization>): Promise<Organization> => {
    const response = await api.put(`/api/organization/${id}`, organizationData);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/organization/${id}`);
  }
};
