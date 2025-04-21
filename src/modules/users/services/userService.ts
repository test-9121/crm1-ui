
import { api } from "@/modules/common/services/api";
import { User, UserFormData, Role } from "@/modules/users/types";
import { organizationService } from "@/modules/organizations/services/organizationService";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/api/auth/');
    return response.data.users || response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/api/auth/${id}`);
    return response.data;
  },

  create: async (userData: UserFormData): Promise<User> => {
    const response = await api.post('/api/auth/', userData);
    return response.data;
  },

  update: async (id: string, userData: UserFormData): Promise<User> => {
    const response = await api.put(`/api/auth/${id}`, userData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/auth/${id}`);
  },

  getAllRoles: async (): Promise<Role[]> => {
    const response = await api.get('/api/roles/');
    return response.data.roles || response.data;
  },

  // Remove the getAllOrganizations method as we'll use organizationService directly
};
