
import { api } from "@/modules/common/services/api";
import { Deal } from "../types";

export const dealService = {
  getAll: async () => {
    const response = await api.get('/api/deals/');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/deals/${id}`);
    return response.data;
  },

  create: async (deal: Omit<Deal, 'id' | 'createdDateTime' | 'lastUpdatedDateTime'>) => {
    const response = await api.post('/api/deals/', deal);
    return response.data;
  },

  update: async (id: string, deal: Partial<Deal>) => {
    const response = await api.put(`/api/deals/${id}`, deal);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/deals/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/deals/stats');
    return response.data;
  },
};
