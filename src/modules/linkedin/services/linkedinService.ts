
import { api } from "@/modules/common/services/api";
import { LinkedInProfile, LinkedInFormValues } from "../types";
import { PaginationMetadata } from "@/modules/targets/types";
import { toast } from "@/components/ui/sonner";

export const linkedinService = {
  // getAll: async (): Promise<LinkedInProfile[]> => {
  //   try {
  //     const response = await api.get('/api/linkedin/');
  //     return response.data.profiles || [];
  //   } catch (error) {
  //     console.error("Error fetching LinkedIn profiles:", error);
  //     throw error;
  //   }
  // },

  getAll: async (page = 0, size = 5): Promise<{ data: LinkedInProfile[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/linkedin/?page=${page}&size=${size}`);

      // Handle the nested response structure
      if (response.data && response.data.profiles && response.data.profiles.content) {
        const pagedResponse = response.data.profiles;


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

      // Handle direct array response
      const profiles = response.data.profiles || [];

      return {
        data: profiles,
        pagination: {
          pageNumber: 0,
          pageSize: profiles.length,
          totalElements: profiles.length,
          totalPages: 1,
          last: true,
          first: true,
          numberOfElements: profiles.length,
          empty: profiles.length === 0,
          size: profiles.length,
          number: 0
        }
      };
    } catch (error) {
      console.error("Error fetching profiles:", error);
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

  getById: async (id: string): Promise<LinkedInProfile> => {
    try {
      const response = await api.get(`/api/linkedin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (data: LinkedInFormValues): Promise<LinkedInProfile> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...data,
        handledBy: data.handledById ? { id: data.handledById } : undefined,
      };

      const response = await api.post('/api/linkedin/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating LinkedIn profile:", error);
      throw error;
    }
  },

  update: async (id: string, data: LinkedInFormValues): Promise<LinkedInProfile> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...data,
        handledBy: data.handledById ? { id: data.handledById } : undefined,
      };

      const response = await api.put(`/api/linkedin/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/linkedin/${id}`);
    } catch (error) {
      console.error(`Error deleting LinkedIn profile with ID ${id}:`, error);
      throw error;
    }
  }
};
