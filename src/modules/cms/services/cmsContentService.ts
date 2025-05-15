
import { api } from "@/modules/common/services/api";
import { CMSContent, CMSContentFormValues } from "../types";
import { toast } from "@/components/ui/sonner";



export const cmsContentService = {
  getAll: async (): Promise<CMSContent[]> => {
    try {
      const response = await api.get('/api/cms-contents/');
      return response.data.cmsContent || [];
    } catch (error) {
      console.error("Error fetching CMS contents:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  getById: async (id: string): Promise<CMSContent> => {
    try {
      const response = await api.get(`/api/cms-contents/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching CMS content with ID ${id}:`, error);
      throw error;
    }
  },
  
  create: async (contentData: CMSContentFormValues): Promise<CMSContent> => {
    try {
      // Send content as JSON instead of FormData
      const response = await api.post('/api/cms-contents/', contentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating CMS content:", error);
      throw error;
    }
  },
  
  update: async (id: string, contentData: CMSContentFormValues): Promise<CMSContent> => {
    try {
      // Send content as JSON instead of FormData
      const response = await api.put(`/api/cms-contents/${id}`, contentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating CMS content with ID ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/cms-contents/${id}`);
    } catch (error) {
      console.error(`Error deleting CMS content with ID ${id}:`, error);
      throw error;
    }
  },
  
  uploadCoverImage: async (id: string, imageFile: File): Promise<string> => {
    try {
      // Check file size and type before uploading
      if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File too large. Maximum size is 5MB.");
        throw new Error("File too large");
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        toast.error("Invalid file type, Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
        throw new Error("Invalid file type");
      }
      
      const formData = new FormData();
      formData.append("coverImage", imageFile);
      
      const response = await api.post(`/api/cms-contents/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // Increase timeout for image uploads
      });
      
      if (!response.data || !response.data.coverUrl) {
        // Return a placeholder if no URL is returned
        return "/placeholder.svg";
      }
      
      return response.data.coverUrl;
    } catch (error) {
      console.error(`Error uploading cover image for content ${id}:`, error);
      
      // Show user-friendly error message
      toast(`Image upload failed ${error.message}`);
      
      // Return placeholder instead of throwing
      return "/placeholder.svg";
    }
  }
};
