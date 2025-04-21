
import { Organization } from "@/modules/organizations/types";

export interface CMSContent {
  id: string;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  title: string;
  description: string;
  content: string;
  metaTitle: string | null;
  metaTags: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  coverUrl: string | null;
  coverUrlData?: string;
  organization: Organization;
}

export interface CMSContentFormValues {
  title: string;
  description: string;
  content: string;
  metaTitle: string | null;
  metaTags: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  coverUrl?: string | null; // String for existing URL
  organizationId?: string;
}

export interface CMSMail {
  id: string;
  createdDateTime: string;
  lastUpdatedDateTime: string | null;
  subject: string;
  content: string;
  organization: Organization;
}

export interface CMSMailFormValues {
  subject: string;
  content: string;
  organizationId?: string;
}
