
export interface Organization {
  id: string;
  name: string;
  description: string;
  domain: string;
  disabled: boolean;
  logoImgSrc: string | null;
  createdDateTime: string;
  lastUpdatedDateTime: string;
}

export interface Role {
  id: string;
  rolePermission: string;
  roleDescription: string;
  roleName: string;
  organization: Organization;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  disabled: boolean;
  role: Role;
  city: string;
  state: string;
  country: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  company: string;
  avatarUrl: string | null;
  status: string;
  verified: boolean;
  emailVerified: boolean;
  lastLoginDateTime: string | null;
  organization: Organization;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  department?: string;
  location?: string;
  jobTitle?: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  organizationId: string;
  city: string;
  state: string;
  country: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  company: string;
  status: string;
  department?: string;
  location?: string;
  jobTitle?: string;
  password?: string;
  avatarUrl?: string;
  disabled?: boolean;
  verified?: boolean;
  emailVerified?: boolean;
}
