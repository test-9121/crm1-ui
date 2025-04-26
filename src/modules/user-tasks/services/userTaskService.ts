
import { api } from "@/modules/common/services/api";
import { UserTask } from "@/modules/user-tasks/types";
import { toast } from "@/components/ui/sonner";

export const userTaskService = {
  getAll: async (): Promise<UserTask[]> => {
    try {
      const response = await api.get('/api/usertasks/');
      return response.data.usertasks || response.data;
    } catch (error) {
      console.error("Error fetching user tasks, using mock data:", error);
      return [];
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
