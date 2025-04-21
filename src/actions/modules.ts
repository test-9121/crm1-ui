
// Re-export services from their new module locations for backward compatibility
import { leadService } from "@/modules/leads/services/leadService";
import { userService } from "@/modules/users/services/userService";
import { designationService } from "@/modules/designations/services/designationService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { industryService } from "@/modules/industries/services/industryService";

// Re-export functions with legacy names for backward compatibility
export const getLeads = leadService.getLeads;
export const createLead = leadService.createLead;
export const updateLead = leadService.updateLead;
export const deleteLead = leadService.deleteLead;

export const getUsers = userService.getAll;
export const createUser = userService.create;
export const updateUser = userService.update;
export const deleteUser = userService.delete;

export const getDesignations = designationService.getAll;
export const createDesignation = designationService.create;
export const updateDesignation = designationService.update;
export const deleteDesignation = designationService.delete;

export const getOrganizations = organizationService.getAll;
export const createOrganization = organizationService.create;
export const updateOrganization = organizationService.update;
export const deleteOrganization = organizationService.delete;

export const getIndustries = industryService.getAll;
