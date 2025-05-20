
import { toast } from "@/components/ui/sonner";
import { api } from "@/modules/common/services/api";
import { Role } from "@/modules/roles/types";
import { PaginationMetadata } from "@/modules/targets/types";

export const roleService = {

  getAll: async (page = 0, size = 5): Promise<{ data: Role[]; pagination: PaginationMetadata }> => {
  try {
    const response = await api.get(`/api/roles/?page=${page}&size=${size}`);

    // Assuming the response structure is similar to profiles, adjust if needed
    if (response.data && response.data.roles && response.data.roles.content) {
      const pagedResponse = response.data.roles;

      return {
        data: pagedResponse.content || [],
        pagination: {
          pageNumber: pagedResponse.number,
          pageSize: pagedResponse.size,
          totalElements: pagedResponse.totalElements,
          totalPages: pagedResponse.totalPages,
          last: pagedResponse.last,
          first: pagedResponse.first,
          numberOfElements: pagedResponse.numberOfElements,
          empty: pagedResponse.empty,
          size: pagedResponse.size,
          number: pagedResponse.number,
        },
      };
    }

    // Handle direct array response fallback
    const roles = response.data.roles || response.data || [];

    return {
      data: roles,
      pagination: {
        pageNumber: 0,
        pageSize: roles.length,
        totalElements: roles.length,
        totalPages: 1,
        last: true,
        first: true,
        numberOfElements: roles.length,
        empty: roles.length === 0,
        size: roles.length,
        number: 0,
      },
    };
  } catch (error) {
    console.error("Error fetching roles:", error);
    toast.error("An error occurred. Please try again.");
    return {
      data: [],
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: true,
        first: true,
        numberOfElements: 0,
        empty: true,
        size: 10,
        number: 0,
      },
    };
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
