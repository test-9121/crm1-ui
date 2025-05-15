
import { api } from "@/modules/common/services/api";
import { Industry } from "@/modules/leads/types";
import { toast } from "@/components/ui/sonner";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const industryService = {
  getAll: async (page = 0, size = 10): Promise<Industry[] | { data: Industry[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/industries?page=${page}&size=${size}`);
      const data = response.data;
      
      // Handle the nested response structure
      if (data && data.industries && data.industries.content) {
        const pagedResponse = data.industries as PagedResponse<Industry>;
        
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
      
      // For backward compatibility, if there's no pagination, return the array directly
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.industries && Array.isArray(data.industries)) {
        return data.industries;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching industries:", error);
      toast.error("An error occurred. Please try again.");
      return [];
    }
  },
  
  getById: async (id: string): Promise<Industry> => {
    try {
      const response = await api.get(`/api/industries/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  create: async (industryData: Partial<Industry>): Promise<Industry> => {
    try {
      const response = await api.post('/api/industries/', industryData);
      toast.success("Created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  update: async (id: string, industryData: Partial<Industry>): Promise<Industry> => {
    try {
      const response = await api.put(`/api/industries/${id}`, industryData);
      toast.success("Updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/industries/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting industry:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  }
};
