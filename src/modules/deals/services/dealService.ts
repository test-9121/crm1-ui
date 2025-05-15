
import api from "@/modules/common/services/api";
import { Deal, DealFormValues } from "../types";
import { PaginationMetadata } from "@/types/pagination";

export const dealsService = {
  getDeals: async (page = 1, size = 10, search = "", filters = {}): Promise<{ data: Deal[], pagination: PaginationMetadata }> => {
    try {
      // Temporary mock implementation
      const mockDeals = generateMockDeals();
      
      const filteredDeals = mockDeals.filter(deal => 
        deal.name.toLowerCase().includes(search.toLowerCase())
      );
      
      const paginatedDeals = filteredDeals.slice((page - 1) * size, page * size);
      
      return {
        data: paginatedDeals,
        pagination: {
          page,
          size,
          totalElements: filteredDeals.length,
          totalPages: Math.ceil(filteredDeals.length / size)
        }
      };
      
      // Real API implementation would look like:
      // const response = await api.get("/deals", { params: { page, size, search, ...filters } });
      // return response.data;
    } catch (error) {
      console.error("Error fetching deals:", error);
      throw error;
    }
  },
  
  getDeal: async (id: string): Promise<Deal> => {
    try {
      // Temporary mock implementation
      const mockDeals = generateMockDeals();
      const deal = mockDeals.find(d => d.id === id);
      
      if (!deal) {
        throw new Error(`Deal with id ${id} not found`);
      }
      
      return deal;
      
      // Real API implementation would look like:
      // const response = await api.get(`/deals/${id}`);
      // return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error);
      throw error;
    }
  },
  
  createDeal: async (dealData: DealFormValues): Promise<Deal> => {
    try {
      // Real API implementation would look like:
      // const response = await api.post("/deals", dealData);
      // return response.data;
      
      // Mock implementation
      const newDeal: Deal = {
        id: `mock-${Date.now()}`,
        createdDateTime: new Date().toISOString(),
        name: dealData.name,
        email: dealData.email,
        stage: dealData.stage,
        value: dealData.value,
        expectedCloseDate: dealData.expectedCloseDate?.toISOString(),
        actualCloseDate: dealData.actualCloseDate?.toISOString(),
        status: dealData.status,
        priority: dealData.priority,
        source: dealData.source,
        nextStep: dealData.nextStep,
        notes: dealData.notes,
        probability: dealData.probability
      };
      
      return newDeal;
    } catch (error) {
      console.error("Error creating deal:", error);
      throw error;
    }
  },
  
  updateDeal: async (id: string, dealData: DealFormValues): Promise<Deal> => {
    try {
      // Real API implementation would look like:
      // const response = await api.put(`/deals/${id}`, dealData);
      // return response.data;
      
      // Mock implementation
      return {
        id,
        name: dealData.name,
        email: dealData.email,
        stage: dealData.stage,
        value: dealData.value,
        expectedCloseDate: dealData.expectedCloseDate?.toISOString(),
        actualCloseDate: dealData.actualCloseDate?.toISOString(),
        status: dealData.status,
        priority: dealData.priority,
        source: dealData.source,
        nextStep: dealData.nextStep,
        notes: dealData.notes,
        probability: dealData.probability
      };
    } catch (error) {
      console.error(`Error updating deal ${id}:`, error);
      throw error;
    }
  },
  
  deleteDeal: async (id: string): Promise<void> => {
    try {
      // Real API implementation would look like:
      // await api.delete(`/deals/${id}`);
      
      // Mock implementation
      console.log(`Mock deletion of deal ${id}`);
      return;
    } catch (error) {
      console.error(`Error deleting deal ${id}:`, error);
      throw error;
    }
  },
  
  updateDealStage: async (id: string, stage: string): Promise<Deal> => {
    try {
      // Real API implementation would look like:
      // const response = await api.patch(`/deals/${id}/stage`, { stage });
      // return response.data;
      
      // Mock implementation
      const mockDeals = generateMockDeals();
      const deal = mockDeals.find(d => d.id === id);
      
      if (!deal) {
        throw new Error(`Deal with id ${id} not found`);
      }
      
      return {
        ...deal,
        stage: stage as any
      };
    } catch (error) {
      console.error(`Error updating deal ${id} stage:`, error);
      throw error;
    }
  },
  
  getDealStats: async (): Promise<{
    totalPipelineValue: number;
    weightedPipelineValue: number;
    dealsWonThisMonth: { count: number; value: number; };
    avgDealSize: { value: number; percentChange: number; };
  }> => {
    try {
      // Real API implementation would look like:
      // const response = await api.get("/deals/stats");
      // return response.data;
      
      // Mock implementation
      const mockDeals = generateMockDeals();
      
      const activeDeals = mockDeals.filter(d => d.status === "ACTIVE");
      const totalPipelineValue = activeDeals.reduce((sum, deal) => sum + deal.value, 0);
      
      const weightedPipelineValue = activeDeals.reduce((sum, deal) => {
        const probability = deal.probability || 0;
        return sum + (deal.value * (probability / 100));
      }, 0);
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const dealsWonThisMonth = mockDeals.filter(deal => {
        if (deal.stage !== "CLOSED_WON" || !deal.actualCloseDate) return false;
        const closeDate = new Date(deal.actualCloseDate);
        return closeDate.getMonth() === currentMonth && closeDate.getFullYear() === currentYear;
      });
      
      const dealsWonValue = dealsWonThisMonth.reduce((sum, deal) => sum + deal.value, 0);
      
      return {
        totalPipelineValue,
        weightedPipelineValue,
        dealsWonThisMonth: {
          count: dealsWonThisMonth.length,
          value: dealsWonValue
        },
        avgDealSize: {
          value: totalPipelineValue / (activeDeals.length || 1),
          percentChange: 12 // Mock percentage change
        }
      };
    } catch (error) {
      console.error("Error fetching deal stats:", error);
      throw error;
    }
  }
};

// Helper function to generate mock deals
function generateMockDeals(): Deal[] {
  return [
    {
      id: "1",
      name: "Software License Renewal",
      email: "client@acmeinc.com",
      stage: "LEAD",
      value: 5000,
      status: "ACTIVE",
      priority: "MEDIUM",
      source: "EMAIL",
      probability: 20,
      notes: "Annual software license renewal",
      nextStep: "Follow up call next week",
      createdDateTime: "2025-04-15T00:00:00.000Z",
      expectedCloseDate: "2025-05-15T00:00:00.000Z"
    },
    {
      id: "2",
      name: "Cloud Migration Project",
      email: "contact@initech.com",
      stage: "DISCOVERY",
      value: 25000,
      status: "ACTIVE",
      priority: "HIGH",
      source: "REFERRAL",
      probability: 40,
      notes: "Migration from on-prem to cloud",
      nextStep: "Technical assessment",
      createdDateTime: "2025-04-10T00:00:00.000Z",
      expectedCloseDate: "2025-05-10T00:00:00.000Z"
    },
    {
      id: "3",
      name: "Security Audit Services",
      email: "security@umbrellacorp.com",
      stage: "PROPOSAL",
      value: 15000,
      status: "ACTIVE",
      priority: "HIGH",
      source: "WEBSITE",
      probability: 60,
      notes: "Security audit and remediation",
      nextStep: "Send proposal",
      createdDateTime: "2025-04-08T00:00:00.000Z",
      expectedCloseDate: "2025-05-08T00:00:00.000Z"
    },
    {
      id: "4",
      name: "IT Support Contract",
      email: "it@soylentcorp.com",
      stage: "NEGOTIATION",
      value: 20000,
      status: "ACTIVE",
      priority: "MEDIUM",
      source: "COLD_CALL",
      probability: 80,
      notes: "Annual IT support contract",
      nextStep: "Finalize contract terms",
      createdDateTime: "2025-04-03T00:00:00.000Z",
      expectedCloseDate: "2025-05-03T00:00:00.000Z"
    },
    {
      id: "5",
      name: "Website Redesign",
      email: "marketing@wayneenterprises.com",
      stage: "CLOSED_WON",
      value: 18000,
      status: "ACTIVE",
      priority: "MEDIUM",
      source: "REFERRAL",
      probability: 100,
      notes: "Complete website redesign",
      nextStep: "Project kickoff",
      createdDateTime: "2025-03-28T00:00:00.000Z",
      expectedCloseDate: "2025-04-28T00:00:00.000Z",
      actualCloseDate: "2025-04-25T00:00:00.000Z"
    },
    {
      id: "6",
      name: "Mobile App Development",
      email: "dev@starkind.com",
      stage: "CLOSED_LOST",
      value: 45000,
      status: "INACTIVE",
      priority: "HIGH",
      source: "EVENT",
      probability: 0,
      notes: "Custom mobile app development",
      nextStep: "None",
      createdDateTime: "2025-03-20T00:00:00.000Z",
      expectedCloseDate: "2025-04-20T00:00:00.000Z"
    },
    {
      id: "7",
      name: "New Hardware Purchase",
      email: "procurement@globexcorp.com",
      stage: "LEAD",
      value: 12000,
      status: "ACTIVE",
      priority: "LOW",
      source: "EMAIL",
      probability: 15,
      notes: "Server hardware upgrade",
      nextStep: "Follow up on requirements",
      createdDateTime: "2025-04-12T00:00:00.000Z",
      expectedCloseDate: "2025-06-12T00:00:00.000Z"
    },
    {
      id: "8",
      name: "Data Analytics Platform",
      email: "data@cyberdyne.com",
      stage: "PROPOSAL",
      value: 30000,
      status: "ACTIVE",
      priority: "HIGH",
      source: "WEBSITE",
      probability: 55,
      notes: "Custom analytics dashboard",
      nextStep: "Technical demo",
      createdDateTime: "2025-04-05T00:00:00.000Z",
      expectedCloseDate: "2025-06-05T00:00:00.000Z"
    },
  ];
}
