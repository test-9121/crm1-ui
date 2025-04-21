
import { ILead } from "@/modules/leads/types";

export const sampleLeads: ILead[] = [
  {
    id: "1",
    firstname: "Alice",
    lastname: "Johnson",
    phonenumber: "+1 123-456-7890",
    email: "alice.johnson@example.com",
    industry: {
      id: "ind-1",
      name: "Technology"
    },
    designation: {
      id: "des-1",
      name: "Software Engineer"
    },
    linkedin: "https://www.linkedin.com/in/alicejohnson",
    website: "https://www.alicecorp.com",
    empcount: "0-10",
    region: "California",
    status: "New",
    leaddate: "2025-04-15",
    sentbyId: "user-123",
    sentby: {
      id: "user-123",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      verified: true,
      emailVerified: true
    },
    verified: true,
    messagesent: true,
    comments: "Interested in SaaS solutions.",
    organization: {
      id: "org-1",
      name: "AliceCorp",
      domain: "alicecorp.com",
      disabled: false
    },
    organizationId: "org-1",
    designationId: "des-1",
    leadReplies: [],
    leadTasks: [],
    draftStatus: false
  },
  {
    id: "2",
    firstname: "Bob",
    lastname: "Smith",
    phonenumber: "+1 987-654-3210",
    email: "bob.smith@example.com",
    industry: {
      id: "ind-2",
      name: "Healthcare"
    },
    designation: {
      id: "des-2",
      name: "Operations Manager"
    },
    linkedin: "https://www.linkedin.com/in/bsmith",
    website: "https://www.healthinnovate.org",
    empcount: "11-50",
    region: "New York",
    status: "Contacted",
    leaddate: "2025-04-10",
    sentbyId: "user-456",
    sentby: {
      id: "user-456",
      firstName: "Sales",
      lastName: "Rep",
      email: "sales@example.com",
      verified: true,
      emailVerified: true
    },
    verified: false,
    messagesent: false,
    comments: "Requested a product demo.",
    organization: {
      id: "org-2",
      name: "HealthInnovate",
      domain: "healthinnovate.org",
      disabled: false
    },
    organizationId: "org-2",
    designationId: "des-2",
    leadReplies: [],
    leadTasks: [],
    draftStatus: false
  },
  {
    id: "3",
    firstname: "Charlie",
    lastname: "Lee",
    phonenumber: "+1 555-321-6789",
    email: "charlie.lee@example.com",
    industry: {
      id: "ind-3",
      name: "Finance"
    },
    designation: {
      id: "des-3",
      name: "Analyst"
    },
    linkedin: "https://www.linkedin.com/in/charlielee",
    website: "https://www.charliefinance.com",
    empcount: "51-100",
    region: "Texas",
    status: "Qualified",
    leaddate: "2025-04-12",
    sentbyId: "user-789",
    sentby: {
      id: "user-789",
      firstName: "Marketing",
      lastName: "Lead",
      email: "marketing@example.com",
      verified: true,
      emailVerified: true
    },
    verified: true,
    messagesent: true,
    comments: "Wants to discuss integration options.",
    organization: {
      id: "org-3",
      name: "CharlieFinance",
      domain: "charliefinance.com",
      disabled: false
    },
    organizationId: "org-3",
    designationId: "des-3",
    leadReplies: [],
    leadTasks: [],
    draftStatus: false
  }
];
