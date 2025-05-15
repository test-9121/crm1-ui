
import { Organization as OrgModuleOrganization } from "@/modules/organizations/types";
import { Organization as UserModuleOrganization } from "@/modules/users/types";
import { Organization as LeadModuleOrganization } from "@/modules/leads/types";

/**
 * Adapts an organization from the organization module type to the user module type
 */
export const adaptToUserOrganization = (org: OrgModuleOrganization): UserModuleOrganization => {
  return {
    id: org.id,
    name: org.name,
    description: org.description || '',
    domain: org.domain,
    disabled: org.disabled,
    logoImgSrc: org.logoImgSrc || null,
    createdDateTime: org.createdDateTime || new Date().toISOString(),
    lastUpdatedDateTime: org.lastUpdatedDateTime || null
  };
};

/**
 * Adapts an organization from the organization module type to the lead module type
 */
export const adaptToLeadOrganization = (org: OrgModuleOrganization): LeadModuleOrganization => {
  return {
    id: org.id,
    name: org.name,
    description: org.description || '',
    domain: org.domain || '',
    disabled: org.disabled || false
  };
};

/**
 * Adapts an array of organizations from the organization module to the user module type
 */
export const adaptOrganizationsForUsers = (
  organizations: OrgModuleOrganization[]
): UserModuleOrganization[] => {
  return organizations.map(adaptToUserOrganization);
};

/**
 * Adapts an array of organizations from the organization module to the lead module type
 */
export const adaptOrganizationsForLeads = (
  organizations: OrgModuleOrganization[]
): LeadModuleOrganization[] => {
  return organizations.map(adaptToLeadOrganization);
};
