
import { z } from "zod";
import { Industry, Designation, Organization, Status, Empcount } from "@/modules/leads/types";

export const leadFormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phonenumber: z.string().optional(),
  linkedin: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  region: z.string().optional().or(z.literal("")),
  empcount: z.string().optional(),
  status: z.string(),
  leaddate: z.date(),
  industry: z.object({
    id: z.string(),
    name: z.string(),
  }),
  designation: z.object({
    id: z.string(),
    name: z.string(),
  }),
  organization: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
  organizationId: z.string().optional(),
  sentbyId: z.string().min(1, "Sent by is required"),
  verified: z.boolean().default(false),
  messagesent: z.boolean().default(false),
  comments: z.string().optional().or(z.literal("")),
  draftStatus: z.boolean().default(false),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
