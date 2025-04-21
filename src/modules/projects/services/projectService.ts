
import { api } from "@/modules/common/services/api";
import { Project, ProjectFormValues } from "@/modules/projects/types";

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    try {
      const response = await api.get('/api/projects/');
      return response.data.projects || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },
  
  getById: async (id: string): Promise<Project> => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  },
  
  create: async (projectData: ProjectFormValues): Promise<Project> => {
    try {
      const response = await api.post('/api/projects/', projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },
  
  update: async (id: string, projectData: ProjectFormValues): Promise<Project> => {
    try {
      const response = await api.put(`/api/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/projects/${id}`);
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }
};
