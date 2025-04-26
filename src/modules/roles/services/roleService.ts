
import { api } from "@/modules/common/services/api";
import { Role } from "@/modules/roles/types";

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    try {
      const response = await api.get('/api/roles/');
      return response.data.roles || response.data;
    } catch (error) {
      console.error("Error fetching roles, using mock data:", error);
      return [];
    }
  },

  getById: async (id: string): Promise<Role> => {
    const response = await api.get(`/api/roles/${id}`);
    return response.data;
  },

  create: async (roleData: Partial<Role>): Promise<Role> => {
    try {
      const response = await api.post('/api/roles/', roleData);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  },

  update: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    try {
      const response = await api.put(`/api/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/roles/${id}`);
  }
};
