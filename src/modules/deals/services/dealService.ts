
import { api } from "@/modules/common/services/api";
import { Deal, DealFormValues, DealStats, DealFilters } from "../types";
import { PaginationMetadata } from "@/types/pagination";

export const dealsService = {
  getDeals: async (page = 1, size = 10, search = "", filters?: DealFilters): Promise<{ deals: Deal[], pagination: PaginationMetadata }> => {
    try {
      // Prepare query parameters
      const params: Record<string, any> = { page: page - 1, size, search };
      
      // Add filters to params if they exist
      if (filters) {
        if (filters.stage && filters.stage.length > 0) {
          params.stages = filters.stage.join(',');
        }
        if (filters.status && filters.status.length > 0) {
          params.statuses = filters.status.join(',');
        }
        if (filters.priority && filters.priority.length > 0) {
          params.priorities = filters.priority.join(',');
        }
        if (filters.minValue) {
          params.minValue = filters.minValue;
        }
        if (filters.maxValue) {
          params.maxValue = filters.maxValue;
        }
      }
      
      const response = await api.get("/api/deals/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching deals:", error);
      throw error;
    }
  },
  
  getAllDeals: async (): Promise<Deal[]> => {
    try {
      const response = await api.get("/api/deals/");
      return response.data.deals || [];
    } catch (error) {
      console.error("Error fetching all deals:", error);
      throw error;
    }
  },
  
  getDeal: async (id: string): Promise<Deal> => {
    try {
      const response = await api.get(`/api/deals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error);
      throw error;
    }
  },
  
  createDeal: async (dealData: DealFormValues): Promise<Deal> => {
    try {
      // Transform dates to ISO strings if they exist
      const formattedData = {
        ...dealData,
        expectedCloseDate: dealData.expectedCloseDate ? new Date(dealData.expectedCloseDate).toISOString() : null,
        actualCloseDate: dealData.actualCloseDate ? new Date(dealData.actualCloseDate).toISOString() : null,
      };
      
      const response = await api.post("/api/deals/", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating deal:", error);
      throw error;
    }
  },
  
  updateDeal: async (id: string, dealData: DealFormValues): Promise<Deal> => {
    try {
      // Transform dates to ISO strings if they exist
      const formattedData = {
        ...dealData,
        expectedCloseDate: dealData.expectedCloseDate ? new Date(dealData.expectedCloseDate).toISOString() : null,
        actualCloseDate: dealData.actualCloseDate ? new Date(dealData.actualCloseDate).toISOString() : null,
      };
      
      const response = await api.put(`/api/deals/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating deal ${id}:`, error);
      throw error;
    }
  },
  
  deleteDeal: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/deals/${id}`);
      return;
    } catch (error) {
      console.error(`Error deleting deal ${id}:`, error);
      throw error;
    }
  },
  
  updateDealStage: async (id: string, stage: string): Promise<Deal> => {
    try {
      const response = await api.patch(`/api/deals/${id}/stage`, { stage });
      return response.data;
    } catch (error) {
      console.error(`Error updating deal ${id} stage:`, error);
      throw error;
    }
  },
  
  getDealStats: async (): Promise<DealStats> => {
    try {
      const response = await api.get("/api/deals/stats");
      return {
        ...response.data,
        totalDeals: response.data.totalDeals || 0
      };
    } catch (error) {
      console.error("Error fetching deal stats:", error);
      throw error;
    }
  }
};
