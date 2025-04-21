
import { api } from "@/lib/api";
import { Industry } from "@/modules/leads/types";

// Industry API calls
export const industriesApi = {
  getAll: async () => {
    try {
      const response = await api.get("/api/industries");
      return response.data;
    } catch (error) {
      console.error("Error fetching industries:", error);
      return [];
    }
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/industries/${id}`);
    return response.data;
  },
  create: async (industryData: Partial<Industry>) => {
    const response = await api.post("/api/industries", industryData);
    return response.data;
  },
  update: async (id: string, industryData: Partial<Industry>) => {
    const response = await api.put(`/api/industries/${id}`, industryData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/industries/${id}`);
    return response.data;
  },
};
