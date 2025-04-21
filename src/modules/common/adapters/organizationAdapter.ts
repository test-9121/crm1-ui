
import { Organization as OrgModuleOrganization } from "@/modules/organizations/types";
import { Organization as LeadModuleOrganization } from "@/modules/leads/types";

/**
 * Adapts an organization from the organization module type to the lead module type
 */
export const adaptToLeadOrganization = (org: OrgModuleOrganization): LeadModuleOrganization => {
  return {
    id: org.id,
    name: org.name,
    description: org.description || null,
    domain: "", // Default value for required field in lead module
    logoImgSrc: null,
    disabled: false // Default value for required field in lead module
  };
};

/**
 * Adapts an array of organizations from the organization module to the lead module type
 */
export const adaptOrganizationsForLeads = (
  organizations: OrgModuleOrganization[]
): LeadModuleOrganization[] => {
  return organizations.map(adaptToLeadOrganization);
};
