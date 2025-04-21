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

  createLead: async (leadData: LeadFormValues): Promise<ILead> => {
    try {
      const apiData = {
        ...leadData,
        industryId: leadData.industry?.id,
        designationId: leadData.designation?.id,
        sentbyId: leadData.sentbyId,
        organizationId: leadData.organization?.id || leadData.organizationId,
        leaddate: leadData.leaddate.toISOString().split('T')[0],
      };
      
      delete apiData.industry;
      delete apiData.designation;
      delete apiData.organization;
      
      const response = await api.post("/api/leads/", apiData);
      toast.success("Created successfully");
      return response.data;
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      throw error; // Re-throw to handle in the form
    }
  },

  updateLead: async (id: string, leadData: Partial<LeadFormValues>): Promise<ILead> => {
    try {
      const apiData: any = { ...leadData };
      
      if (leadData.industry) {
        apiData.industryId = leadData.industry.id;
        delete apiData.industry;
      }
      
      if (leadData.designation) {
        apiData.designationId = leadData.designation.id;
        delete apiData.designation;
      }
      
      if (leadData.organization) {
        apiData.organizationId = leadData.organization.id;
        delete apiData.organization;
      }
      
      if (leadData.leaddate) {
        apiData.leaddate = leadData.leaddate.toISOString().split('T')[0];
      }
      
      const response = await api.put(`/api/leads/${id}`, apiData);
      toast.success("Updated successfully");
      return response.data;
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      throw error; // Re-throw to handle in the form
    }
  },

  deleteLead: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/leads/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  }
};
