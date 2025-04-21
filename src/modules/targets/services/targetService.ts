
import { api } from "@/modules/common/services/api";
import { Target } from "@/modules/targets/types";

const mockTargets: Target[] = [
  {
    id: "1",
    accountName: "Microsoft",
    connectionsCount: 150,
    handledById: "1",
    noOfLeadsIdentified: 45,
    connectionsSent: 120,
    messagesSent: 85,
    status: "Active",
    followUps: 22,
    createdDate: "2024-11-25",
    inMailCount: 18,
    postings: 12,
    meetingsScheduled: 5,
    responseReceived: "YES",
    organization: {
      id: "1",
      name: "Demo Org",
      description: "Demo Organization",
      domain: "demo-domain",
      disabled: false,
      logoImgSrc: null,
      createdDateTime: "2025-04-16T17:23:59.000+00:00",
      lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
    },
    createdDateTime: "2025-04-10T08:30:00Z",
    lastUpdatedDateTime: "2025-04-15T10:45:00Z"
  },
  {
    id: "2",
    accountName: "Google",
    connectionsCount: 200,
    handledById: "2",
    noOfLeadsIdentified: 65,
    connectionsSent: 180,
    messagesSent: 120,
    status: "Active",
    followUps: 30,
    createdDate: "2024-11-26",
    inMailCount: 25,
    postings: 18,
    meetingsScheduled: 8,
    responseReceived: "YES",
    organization: {
      id: "1",
      name: "Demo Org",
      description: "Demo Organization",
      domain: "demo-domain",
      disabled: false,
      logoImgSrc: null,
      createdDateTime: "2025-04-16T17:23:59.000+00:00",
      lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
    },
    createdDateTime: "2025-04-05T09:15:00Z",
    lastUpdatedDateTime: "2025-04-14T14:20:00Z"
  },
  {
    id: "3",
    accountName: "Amazon",
    connectionsCount: 175,
    handledById: "3",
    noOfLeadsIdentified: 55,
    connectionsSent: 150,
    messagesSent: 90,
    status: "InActive",
    followUps: 28,
    createdDate: "2024-11-27",
    inMailCount: 20,
    postings: 15,
    meetingsScheduled: 6,
    responseReceived: "NO",
    organization: {
      id: "1",
      name: "Demo Org",
      description: "Demo Organization",
      domain: "demo-domain",
      disabled: false,
      logoImgSrc: null,
      createdDateTime: "2025-04-16T17:23:59.000+00:00",
      lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
    },
    createdDateTime: "2025-03-25T11:45:00Z",
    lastUpdatedDateTime: "2025-04-10T09:30:00Z"
  }
];

export const targetService = {
  getAll: async (): Promise<Target[]> => {
    try {
      const response = await api.get('/api/targets/');
      return response.data.targets || response.data;
    } catch (error) {
      console.error("Error fetching targets, using mock data:", error);
      return mockTargets;
    }
  },
  
  getById: async (id: string): Promise<Target> => {
    try {
      const response = await api.get(`/api/targets/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching target by ID, using mock data:", error);
      const target = mockTargets.find(target => target.id === id);
      if (!target) throw new Error("Target not found");
      return target;
    }
  },
  
  create: async (targetData: Partial<Target>): Promise<Target> => {
    try {
      const response = await api.post('/api/targets/', targetData);
      return response.data;
    } catch (error) {
      console.error("Error creating target:", error);
      // Create mock data with ID
      const newTarget: Target = {
        id: String(Date.now()),
        accountName: targetData.accountName || "",
        connectionsCount: targetData.connectionsCount || 0,
        handledById: targetData.handledById || "",
        noOfLeadsIdentified: targetData.noOfLeadsIdentified || 0,
        connectionsSent: targetData.connectionsSent || 0,
        messagesSent: targetData.messagesSent || 0,
        status: targetData.status || "Active",
        followUps: targetData.followUps || 0,
        createdDate: targetData.createdDate || new Date().toISOString().split('T')[0],
        inMailCount: targetData.inMailCount || 0,
        postings: targetData.postings || 0,
        meetingsScheduled: targetData.meetingsScheduled || 0,
        responseReceived: targetData.responseReceived || "NO",
        organization: {
          id: "1",
          name: "Demo Org",
          description: "Demo Organization",
          domain: "demo-domain",
          disabled: false,
          logoImgSrc: null,
          createdDateTime: "2025-04-16T17:23:59.000+00:00",
          lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
        },
        createdDateTime: new Date().toISOString(),
        lastUpdatedDateTime: null
      };
      mockTargets.push(newTarget);
      return newTarget;
    }
  },
  
  update: async (id: string, targetData: Partial<Target>): Promise<Target> => {
    try {
      const response = await api.put(`/api/targets/${id}`, targetData);
      return response.data;
    } catch (error) {
      console.error("Error updating target:", error);
      const index = mockTargets.findIndex(target => target.id === id);
      if (index === -1) throw new Error("Target not found");
      
      mockTargets[index] = {
        ...mockTargets[index],
        ...targetData,
        lastUpdatedDateTime: new Date().toISOString()
      };
      
      return mockTargets[index];
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/targets/${id}`);
    } catch (error) {
      console.error("Error deleting target:", error);
      const index = mockTargets.findIndex(target => target.id === id);
      if (index !== -1) {
        mockTargets.splice(index, 1);
      }
    }
  }
};
