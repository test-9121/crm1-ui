
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/modules/projects/services/projectService";
import { Project, ProjectFormValues } from "@/modules/projects/types";
import { toast } from "@/components/ui/sonner";

export const useProjects = () => {
  const queryClient = useQueryClient();

  const { 
    data = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getAll,
  });

  const getProjectById = (id: string): Project | undefined => {
    return data.find(project => project.id === id);
  };

  const isEmpty = data.length === 0 && !isLoading;

  // Create project mutation
  const createProject = useMutation({
    mutationFn: (projectData: ProjectFormValues) => 
      projectService.create(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      toast.error("An error occurred");
    }
  });

  // Update project mutation
  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectFormValues }) => 
      projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      toast.error("An error occurred");
    }
  });

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      toast.error("An error occurred");
    }
  });

  return {
    projects: Array.isArray(data) ? data : [],
    isLoading,
    error,
    isEmpty,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
  };
};
