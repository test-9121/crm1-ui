
import { toast } from "@/components/ui/sonner";
import { api } from "@/modules/common/services/api";
import { Project, ProjectFormValues } from "@/modules/projects/types";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const projectService = {
  getAll: async (page = 0, size = 5): Promise<{ data: Project[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/projects/?page=${page}&size=${size}`);
      
      // Handle the nested response structure
      if (response.data && response.data.projects && response.data.projects.content) {
        const pagedResponse = response.data.projects as PagedResponse<Project>;
        
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
      const projects = response.data.projects || [];
      
      return {
        data: projects,
        pagination: {
          pageNumber: 0,
          pageSize: projects.length,
          totalElements: projects.length,
          totalPages: 1,
          last: true,
          first: true,
          numberOfElements: projects.length,
          empty: projects.length === 0,
          size: projects.length,
          number: 0
        }
      };
    } catch (error) {
      console.error("Error fetching projects:", error);
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
