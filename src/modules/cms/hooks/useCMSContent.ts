
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsContentService } from "../services/cmsContentService";
import { CMSContentFormValues } from "../types";
import { toast } from "@/hooks/use-toast";

export const useCMSContent = () => {
  const queryClient = useQueryClient();

  const allContents = useQuery({
    queryKey: ["cms-contents"],
    queryFn: cmsContentService.getAll,
    retry: 1, // Only retry once to prevent excessive retries on server errors
  });

  const getContentById = (id: string) => {
    return useQuery({
      queryKey: ["cms-content", id],
      queryFn: () => cmsContentService.getById(id),
      enabled: !!id && id !== "new" && id !== "create",
      retry: 1,
    });
  };

  const createContent = useMutation({
    mutationFn: async (data: { values: CMSContentFormValues; coverImage?: File }) => {
      try {
        // First create the content
        const content = await cmsContentService.create(data.values);
        
        // If there's a cover image, upload it separately
        if (data.coverImage && content.id) {
          try {
            const coverUrl = await cmsContentService.uploadCoverImage(content.id, data.coverImage);
            // Return the updated content with cover URL
            return { ...content, coverUrl };
          } catch (imageError) {
            console.error("Failed to upload image but content was created", imageError);
            // Return content without image if upload fails
            return content;
          }
        }
        
        return content;
      } catch (error) {
        console.error("Error in createContent mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      toast({
        title: "Content created",
        description: "Content has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create content",
        description: error.response?.data?.message || "There was an error creating the content.",
        variant: "destructive",
      });
    },
  });

  const updateContent = useMutation({
    mutationFn: async ({ id, values, coverImage }: { id: string; values: CMSContentFormValues; coverImage?: File }) => {
      try {
        // First update the content data
        const content = await cmsContentService.update(id, values);
        
        // If there's a cover image, upload it separately
        if (coverImage) {
          try {
            const coverUrl = await cmsContentService.uploadCoverImage(id, coverImage);
            // Return the updated content with cover URL
            return { ...content, coverUrl };
          } catch (imageError) {
            console.error("Failed to upload image but content was updated", imageError);
            // Return updated content without new image if upload fails
            return content;
          }
        }
        
        return content;
      } catch (error) {
        console.error("Error in updateContent mutation:", error);
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      queryClient.invalidateQueries({ queryKey: ["cms-content", variables.id] });
      toast({
        title: "Content updated",
        description: "Content has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update content",
        description: error.response?.data?.message || "There was an error updating the content.",
        variant: "destructive",
      });
    },
  });

  const deleteContent = useMutation({
    mutationFn: (id: string) => {
      return cmsContentService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      toast({
        title: "Content deleted",
        description: "Content has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete content",
        description: error.response?.data?.message || "There was an error deleting the content.",
        variant: "destructive",
      });
    },
  });

  return {
    allContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
  };
};
