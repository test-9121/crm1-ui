
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/modules/projects/services/projectService";
import { Project, ProjectFormValues } from "@/modules/projects/types";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

export const useProjects = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5
  });

  const { 
    data,
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["projects", pagination.page, pagination.size],
    queryFn: () => projectService.getAll(pagination.page, pagination.size),
  });

  const projects = data?.data || [];
  const paginationData = data?.pagination || {
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
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({
      page: 0, // Reset to first page when changing page size
      size: newSize
    });
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const isEmpty = projects.length === 0 && !isLoading && !isFetching;

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
    projects,
    pagination: paginationData,
    isLoading: isLoading || isFetching,
    error,
    isEmpty,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    handlePageChange,
    handlePageSizeChange,
    refetch
  };
};
