
import { toast } from "@/components/ui/sonner";
import { api } from "@/modules/common/services/api";
import { Organization } from "@/modules/organizations/types";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const organizationService = {
  getAll: async (page = 0, size = 10): Promise<{ data: Organization[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/organization/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.organizations) {
        const pagedResponse = response.data.organizations;
        
        // Check if the response has pagination information
        if (pagedResponse.content || pagedResponse.number !== undefined) {
          return {
            data: pagedResponse.content || pagedResponse || [],
            pagination: {
              pageNumber: pagedResponse.number || 0,
              pageSize: pagedResponse.size || size,
              totalElements: pagedResponse.totalElements || pagedResponse.length || 0,
              totalPages: pagedResponse.totalPages || 1,
              last: pagedResponse.last || true,
              first: pagedResponse.first || true,
              numberOfElements: pagedResponse.numberOfElements || pagedResponse.length || 0,
              empty: pagedResponse.empty || (pagedResponse.length === 0),
              size: pagedResponse.size || size,
              number: pagedResponse.number || 0
            }
          };
        }
        
        // Handle array response
        return {
          data: Array.isArray(pagedResponse) ? pagedResponse : [],
          pagination: {
            pageNumber: 0,
            pageSize: size,
            totalElements: Array.isArray(pagedResponse) ? pagedResponse.length : 0,
            totalPages: 1,
            last: true,
            first: true,
            numberOfElements: Array.isArray(pagedResponse) ? pagedResponse.length : 0,
            empty: Array.isArray(pagedResponse) ? pagedResponse.length === 0 : true,
            size: size,
            number: 0
          }
        };
      }

      // Handle a direct array response as fallback
      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: {
            pageNumber: 0,
            pageSize: response.data.length,
            totalElements: response.data.length,
            totalPages: 1,
            last: true,
            first: true,
            numberOfElements: response.data.length,
            empty: response.data.length === 0,
            size: response.data.length,
            number: 0
          }
        };
      }
      
      // Default empty response
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
          number: 0
        }
      };
    } catch (error) {
      console.error("Error fetching organizations:", error);
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
          number: 0
        }
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
