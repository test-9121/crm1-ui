
import { api } from "@/modules/common/services/api";
import { UserTask } from "@/modules/user-tasks/types";
import { toast } from "@/components/ui/sonner";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const userTaskService = {
  getAll: async (page: number, size:number): Promise<{ data: UserTask[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/usertasks/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.usertasks) {
        const pagedResponse = response.data.usertasks;
        
        return {
          data: pagedResponse.content === undefined ? pagedResponse : pagedResponse.content || [],
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
      console.error("Error fetching user tasks, using mock data:", error);
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

  getById: async (id: string): Promise<UserTask> => {
    const response = await api.get(`/api/usertasks/${id}`);
    return response.data;
  },

  create: async (userTaskData: Partial<UserTask>): Promise<UserTask> => {
    try {
      const payload = {
        ...userTaskData,
      };
      
      const response = await api.post('/api/usertasks/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating user task:", error);
      throw error;
    }
  },

  update: async (id: string, userTaskData: Partial<UserTask>): Promise<UserTask> => {
    try {
      
      const response = await api.put(`/api/usertasks/${id}`, userTaskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user task with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/usertasks/${id}`);
  }
};
