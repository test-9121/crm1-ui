
import { api } from "@/modules/common/services/api";
import { User, UserFormData, Role } from "@/modules/users/types";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";
import { toast } from "@/components/ui/sonner";

export const userService = {
  getAll: async (page = 0, size = 10): Promise<User[] | { data: User[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/auth/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.users && response.data.users.content) {
        const pagedResponse = response.data.users as PagedResponse<User>;
        
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
            number: pagedResponse.number
          }
        };
      }
      
      // For backward compatibility, return the array directly
      return response.data.users || response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred. Please try again.");
      return [];
    }
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
};
