
import { api } from "@/modules/common/services/api";
import { Deal, DealFormValues, DealStats } from "../types";
import { PaginationMetadata } from "@/types/pagination";

export const dealsService = {
  getDeals: async (page = 1, size = 10, search = "", filters = {}): Promise<{ data: Deal[], pagination: PaginationMetadata }> => {
    try {
      const response = await api.get("/api/deals/", { 
        params: { 
          page, 
          size, 
          search,
          ...filters 
        } 
      });
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
      const response = await api.post("/api/deals/", dealData);
      return response.data;
    } catch (error) {
      console.error("Error creating deal:", error);
      throw error;
    }
  },
  
  updateDeal: async (id: string, dealData: DealFormValues): Promise<Deal> => {
    try {
      const response = await api.put(`/api/deals/${id}`, dealData);
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
