
// Re-export from the new location to maintain backward compatibility
export { api } from "@/modules/common/services/api";

// Import new service modules and re-export as named exports
import { userService } from "@/modules/users/services/userService";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { designationService } from "@/modules/designations/services/designationService";
import { industryService } from "@/modules/industries/services/industryService";
import { authService } from "@/modules/auth/services/authService";
import { linkedinService } from "@/modules/linkedin/services/linkedinService";
import { roleService } from "@/modules/roles/services/roleService";
import { targetService } from "@/modules/targets/services/targetService";
import { projectService } from "@/modules/projects/services/projectService";
import { userTaskService } from "@/modules/user-tasks/services/userTaskService";
import { eventService } from "@/modules/events/services/eventService";
import { cmsContentService } from "@/modules/cms/services/cmsContentService";
import { cmsMailService } from "@/modules/cms/services/cmsMailService";
import { leadReplyService } from "@/modules/leads/services/leadReplyService";
import { leadResponseService } from "@/modules/leads/services/leadResponseService";
import { dealsService } from "@/modules/deals/services/dealService";
import { api } from "@/modules/common/services/api";

// Re-export the services with legacy names for backward compatibility
export const authApi = authService;
export const usersApi = userService;
export const designationsApi = designationService;
export const organizationsApi = organizationService;
export const industriesApi = industryService;
export const linkedinApi = linkedinService;
export const rolesApi = roleService;
export const targetsApi = targetService;
export const projectsApi = projectService;
export const userTasksApi = userTaskService;
export const eventsApi = eventService;
export const cmsContentApi = cmsContentService;
export const cmsMailApi = cmsMailService;
export const leadRepliesApi = leadReplyService;
export const leadResponsesApi = leadResponseService;
export const dealsApi = dealsService;

// Export CRM-related APIs for backward compatibility
export const leadsApi = {
  getAll: async () => {
    const response = await api.get('/api/leads/');
    return response.data;
  },
};

export const contactsApi = {
  getAll: async () => {
    const response = await api.get('/api/contacts/');
    return response.data;
  },
};
