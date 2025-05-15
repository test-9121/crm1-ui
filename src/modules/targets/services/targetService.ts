
import { api } from "@/modules/common/services/api";
import { PagedResponse, PaginationMetadata, Target } from "../types";
import { toast } from "@/components/ui/sonner";

export const targetService = {
  getAll: async (page = 0, size = 5): Promise<{ data: Target[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/targets/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.targets) {
        const { targets } = response.data;
        
        return {
          data: targets.content || [],
          pagination: {
            pageNumber: targets.number,
            pageSize: targets.size,
            totalElements: targets.totalElements,
            totalPages: targets.totalPages,
            last: targets.last,
            first: targets.first,
            numberOfElements: targets.numberOfElements,
            empty: targets.empty,
            size: targets.size,
            number: targets.number
          }
        };
      }
      
      console.error("Unexpected API response format:", response.data);
      return { data: [], pagination: {
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
      }};
    } catch (error) {
      console.error("Error fetching targets:", error);
      toast.error("An error occurred. Please try again.");
      return { data: [], pagination: {
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
      }};
    }
  },

  getById: async (id: string): Promise<Target> => {
    const response = await api.get(`/api/targets/${id}`);
    return response.data;
  },

  create: async (targetData: Partial<Target>): Promise<Target> => {
    try {
      const payload = {
        ...targetData,
        // Handle handledBy relationship using handledById
        handledBy: targetData.handledById ? { id: targetData.handledById } : undefined,
      };

      const response = await api.post('/api/targets/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating target:", error);
      throw error;
    }
  },

  update: async (id: string, targetData: Partial<Target>): Promise<Target> => {
    try {
      const payload = {
        ...targetData,
        // Handle handledBy relationship using handledById
        handledBy: targetData.handledById ? { id: targetData.handledById } : undefined,
      };

      const response = await api.put(`/api/targets/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating target with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/targets/${id}`);
  }
};
