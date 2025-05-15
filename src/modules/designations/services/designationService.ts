
import { api } from "@/modules/common/services/api";
import { Designation } from "@/modules/leads/types"; // We'll import from leads/types for now to avoid duplication
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const designationService = {
  getAll: async (page = 0, size = 10): Promise<{ data: Designation[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/designations/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.designations) {
        const pagedResponse = response.data.designations as PagedResponse<Designation>;
        
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

      // Handle a direct array response for backward compatibility
      const data = Array.isArray(response.data) 
        ? response.data 
        : (response.data && Array.isArray(response.data.designations)) 
          ? response.data.designations 
          : [];
          
      return {
        data: data,
        pagination: {
          pageNumber: 0,
          pageSize: data.length,
          totalElements: data.length,
          totalPages: 1,
          last: true,
          first: true,
          numberOfElements: data.length,
          empty: data.length === 0,
          size: data.length,
          number: 0
        }
      };
    } catch (error) {
      console.error("Error fetching designations:", error);
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
