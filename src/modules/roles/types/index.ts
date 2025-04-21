
import { Organization } from "@/modules/organizations/types";

export type RolePermission = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_USER';

export interface Role {
  id: string;
  roleName: string;
  roleDescription: string;
  rolePermission: RolePermission;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  organization: Organization;
}
