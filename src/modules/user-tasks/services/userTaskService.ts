import { api } from "@/modules/common/services/api";
import { UserTask } from "@/modules/user-tasks/types";
import { User } from "@/modules/users/types";
import { toast } from "@/components/ui/sonner";

// Simple wrapper for the mock user data that conforms to the User type
const createMockUser = (mockData: any): User => {
  return {
    id: mockData.id,
    firstName: mockData.firstName,
    lastName: mockData.lastName,
    email: mockData.email,
    role: mockData.role,
    // Adding required fields with default values
    disabled: false,
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    createdDateTime: new Date().toISOString(),
    lastUpdatedDateTime: new Date().toISOString(),
    organization: mockData.role?.organization,
    avatarUrl: null, // Changed from profileImgSrc to avatarUrl
    address: "",
    zipCode: "",
    department: "",
    location: "",
    jobTitle: "",
    lastLoginDateTime: null,
    status: "Active",
    verified: false,
    emailVerified: false,
    company: ""
  };
};

const mockUserTasks: UserTask[] = [
  {
    id: "1",
    name: "Schedule Initial Meeting",
    description: "Reach out to the lead and arrange an initial discovery call",
    startDate: "2025-04-20T10:00:00Z",
    endDate: "2025-04-20T11:00:00Z",
    priority: "High",
    status: "Pending",
    createdDateTime: "2025-04-15T08:30:00Z",
    lastUpdatedDateTime: null,
    user: createMockUser({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: {
        id: "1", 
        roleName: "Admin",
        rolePermission: "ROLE_ADMIN",
        roleDescription: "Full system access",
        createdDateTime: "2025-04-15T08:30:00Z",
        lastUpdatedDateTime: null,
        organization: {
          id: "1",
          name: "Demo Org",
          description: "Demo Organization",
          domain: "demo-domain",
          disabled: false,
          logoImgSrc: null,
          createdDateTime: "2025-04-16T17:23:59.000+00:00",
          lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
        }
      }
    }),
    organization: {
      id: "1",
      name: "Demo Org",
      description: "Demo Organization",
      domain: "demo-domain",
      disabled: false,
      logoImgSrc: null,
      createdDateTime: "2025-04-16T17:23:59.000+00:00",
      lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
    }
  },
  {
    id: "2",
    name: "Send Proposal",
    description: "Prepare and send the project proposal to the client",
    startDate: "2025-04-21T14:00:00Z",
    endDate: "2025-04-21T16:00:00Z",
    priority: "Medium",
    status: "In Progress",
    createdDateTime: "2025-04-15T09:45:00Z",
    lastUpdatedDateTime: "2025-04-16T10:20:00Z",
    user: createMockUser({
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: {
        id: "2", 
        roleName: "User",
        rolePermission: "ROLE_USER",
        roleDescription: "Limited system access",
        createdDateTime: "2025-04-15T08:30:00Z",
        lastUpdatedDateTime: null,
        organization: {
          id: "1",
          name: "Demo Org",
          description: "Demo Organization",
          domain: "demo-domain",
          disabled: false,
          logoImgSrc: null,
          createdDateTime: "2025-04-16T17:23:59.000+00:00",
          lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
        }
      }
    }),
    organization: {
      id: "1",
      name: "Demo Org",
      description: "Demo Organization",
      domain: "demo-domain",
      disabled: false,
      logoImgSrc: null,
      createdDateTime: "2025-04-16T17:23:59.000+00:00",
      lastUpdatedDateTime: "2025-04-16T12:10:43.000+00:00"
    }
  }
];

export const userTaskService = {
  getAll: async (): Promise<UserTask[]> => {
    try {
      const response = await api.get('/api/usertasks/');
      return response.data.usertasks || response.data;
    } catch (error) {
      console.error("Error fetching user tasks, using mock data:", error);
      return mockUserTasks;
    }
  },
  
  getById: async (id: string): Promise<UserTask> => {
    try {
      const response = await api.get(`/api/usertasks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user task by ID, using mock data:", error);
      const userTask = mockUserTasks.find(userTask => userTask.id === id);
      if (!userTask) throw new Error("User task not found");
      return userTask;
    }
  },
  
  create: async (userTaskData: Partial<UserTask>): Promise<UserTask> => {
    try {
      const response = await api.post('/api/usertasks/', userTaskData);
      toast.success("User task created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating user task:", error);
      toast.error("An error occurred");
      
      // Create mock data with ID
      const newUserTask: UserTask = {
        id: String(Date.now()),
        name: userTaskData.name || "",
        description: userTaskData.description || "",
        startDate: userTaskData.startDate || new Date().toISOString(),
        endDate: userTaskData.endDate || new Date().toISOString(),
        priority: userTaskData.priority || "Medium",
        status: userTaskData.status || "Pending",
        user: userTaskData.user || mockUserTasks[0].user,
        lead: userTaskData.lead,
        organization: userTaskData.organization || mockUserTasks[0].organization,
        createdDateTime: new Date().toISOString(),
        lastUpdatedDateTime: null
      };
      mockUserTasks.push(newUserTask);
      return newUserTask;
    }
  },
  
  update: async (id: string, userTaskData: Partial<UserTask>): Promise<UserTask> => {
    try {
      const response = await api.put(`/api/usertasks/${id}`, userTaskData);
      toast.success("User task updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating user task:", error);
      toast.error("An error occurred");
      
      const index = mockUserTasks.findIndex(userTask => userTask.id === id);
      if (index === -1) throw new Error("User task not found");
      
      mockUserTasks[index] = {
        ...mockUserTasks[index],
        ...userTaskData,
        lastUpdatedDateTime: new Date().toISOString()
      };
      
      return mockUserTasks[index];
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/usertasks/${id}`);
      toast.success("User task deleted successfully");
    } catch (error) {
      console.error("Error deleting user task:", error);
      toast.error("An error occurred");
      
      const index = mockUserTasks.findIndex(userTask => userTask.id === id);
      if (index !== -1) {
        mockUserTasks.splice(index, 1);
      }
    }
  }
};
