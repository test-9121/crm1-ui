
import { api } from "@/modules/common/services/api";
import { ILead } from "@/modules/leads/types";
import { LeadFormValues } from "@/modules/leads/schemas/leadSchema";
import { toast } from "@/components/ui/sonner";
import { PagedResponse, PaginationMetadata } from "@/modules/targets/types";

export const leadService = {
  getLeads: async (page = 0, size = 10): Promise<ILead[] | { data: ILead[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get(`/api/leads/?page=${page}&size=${size}`);
      const data = response.data;
      
      // Handle the nested response structure
      if (data && data.leads && data.leads.content) {
        const pagedResponse = data.leads as PagedResponse<ILead>;
        
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

      // For backward compatibility, return the array directly
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

  getAllLeads: async (): Promise<ILead[]> => {
    try {
      const response = await api.get("/api/leads/all");
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
  },

  // Updated export method to handle CSV data and ensure proper empcount formatting
  exportLeads: async (): Promise<Blob> => {
    try {
      // Get all leads data first to modify before export
      const leadsResponse = await api.get("/api/leads/all");
      let leadsData = [];
      
      // Extract leads data from response based on structure
      if (Array.isArray(leadsResponse.data)) {
        leadsData = leadsResponse.data;
      } else if (leadsResponse.data && typeof leadsResponse.data === 'object') {
        if (Array.isArray(leadsResponse.data.leads)) {
          leadsData = leadsResponse.data.leads;
        } else if (leadsResponse.data.content) {
          leadsData = leadsResponse.data.content;
        }
      }
      
      // Process leads data to ensure empcount is correctly formatted
      const processedLeads = leadsData.map(lead => ({
        ...lead,
        // Ensure empcount is treated as a string, not a date
        empcount: lead.empcount ? String(lead.empcount) : ''
      }));
      
      // Request the server to generate CSV with the processed data
      const response = await api.post("/api/leads/export", { leads: processedLeads }, { 
        responseType: 'blob'
      });
      
      // Return the blob data as CSV
      return new Blob([response.data], { 
        type: 'text/csv' 
      });
    } catch (error) {
      console.error("Error exporting leads:", error);
      throw error;
    }
  },

  importLeads: async (file: File): Promise<{ duplicates: number, inserted: number }> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await api.post("/api/leads/import", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      // Return the response data which contains duplicates and inserted counts
      return response.data;
    } catch (error) {
      console.error("Error importing leads:", error);
      throw error;
    }
  }
};
