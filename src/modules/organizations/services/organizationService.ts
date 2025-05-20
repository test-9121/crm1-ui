
import { toast } from "@/components/ui/sonner";
import { api } from "@/modules/common/services/api";
import { Organization } from "@/modules/organizations/types";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const organizationService = {
  getAll: async (page = 0, size = 5): Promise<{ data: Organization[]; pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/organization/?page=${page}&size=${size}`);
  
      // Assuming the response structure is similar to profiles, adjust if needed
      if (response.data && response.data.content) {
        const pagedResponse = response.data;
  
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
      const organizations = response.data.organization || response.data || [];
      return {
        data: organizations,
        pagination: {
          pageNumber: 0,
          pageSize: organizations.length,
          totalElements: organizations.length,
          totalPages: 1,
          last: true,
          first: true,
          numberOfElements: organizations.length,
          empty: organizations.length === 0,
          size: organizations.length,
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
