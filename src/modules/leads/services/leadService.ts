
import { api } from "@/modules/common/services/api";
import { ILead } from "@/modules/leads/types";
import { LeadFormValues } from "@/modules/leads/schemas/leadSchema";
import { toast } from "@/components/ui/sonner";

export const leadService = {
  getLeads: async (): Promise<ILead[]> => {
    try {
      const response = await api.get("/api/leads/");
      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.leads)) {
        return data.leads;
      }

      return [];
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("An error occurred. Please try again.");
      return [];
    }
  },

  createLead: async (leadData: Partial<ILead>): Promise<ILead> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...leadData,
        // Handle designation relationship
        designation: leadData.designation ? { id: leadData.designation.id } : undefined,
        designationId: leadData.designation?.id,
        
        // // Handle sentby relationship
        // sentby: leadData.sentby ? { id: leadData.sentby.id } : undefined,
        // sentbyId: leadData.sentby?.id,
      };

      const response = await api.post('/api/leads/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
  },

  updateLead: async (id: string, leadData: Partial<ILead>): Promise<ILead> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...leadData,
        // Handle designation relationship
        designation: leadData.designation ? { id: leadData.designation.id } : undefined,
        designationId: leadData.designation?.id,
      };

      const response = await api.put(`/api/leads/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating lead with ID ${id}:`, error);
      throw error;
    }
  },

  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/api/leads/${id}`);
  }
};
