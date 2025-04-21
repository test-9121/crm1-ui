
import { api } from "@/modules/common/services/api";
import { Role } from "@/modules/roles/types";

const mockRoles: Role[] = [
  {
    id: "1",
    roleName: "Administrator",
    roleDescription: "Full system access",
    rolePermission: "ROLE_ADMIN",
    createdDateTime: "2025-04-15T10:30:00Z",
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
  },
  {
    id: "2",
    roleName: "User",
    roleDescription: "Limited system access",
    rolePermission: "ROLE_USER",
    createdDateTime: "2025-04-15T10:30:00Z",
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
  },
  {
    id: "3",
    roleName: "Super Admin",
    roleDescription: "Complete system control",
    rolePermission: "ROLE_SUPER_ADMIN",
    createdDateTime: "2025-04-15T10:30:00Z",
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
];

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    try {
      const response = await api.get('/api/roles/');
      return response.data.roles || response.data;
    } catch (error) {
      console.error("Error fetching roles, using mock data:", error);
      return mockRoles;
    }
  },
  
  getById: async (id: string): Promise<Role> => {
    try {
      const response = await api.get(`/api/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching role by ID, using mock data:", error);
      const role = mockRoles.find(role => role.id === id);
      if (!role) throw new Error("Role not found");
      return role;
    }
  },
  
  create: async (roleData: Partial<Role>): Promise<Role> => {
    try {
      const response = await api.post('/api/roles/', roleData);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      // Create mock data with ID
      const newRole: Role = {
        id: String(Date.now()),
        roleName: roleData.roleName || "",
        roleDescription: roleData.roleDescription || "",
        rolePermission: roleData.rolePermission || "ROLE_USER",
        createdDateTime: new Date().toISOString(),
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
      };
      mockRoles.push(newRole);
      return newRole;
    }
  },
  
  update: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    try {
      const response = await api.put(`/api/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error("Error updating role:", error);
      const index = mockRoles.findIndex(role => role.id === id);
      if (index === -1) throw new Error("Role not found");
      
      mockRoles[index] = {
        ...mockRoles[index],
        ...roleData,
        lastUpdatedDateTime: new Date().toISOString()
      };
      
      return mockRoles[index];
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/roles/${id}`);
    } catch (error) {
      console.error("Error deleting role:", error);
      const index = mockRoles.findIndex(role => role.id === id);
      if (index !== -1) {
        mockRoles.splice(index, 1);
      }
    }
  }
};
