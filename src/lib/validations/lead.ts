
import * as z from "zod";

export const leadFormSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email().optional().nullable(),
  phonenumber: z.string().optional().nullable(),
  linkedin: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
  region: z.string().optional().nullable(),
  empcount: z.string().optional(),
  industry: z.object({
    id: z.string(),
    name: z.string(),
  }),
  designation: z.object({
    id: z.string(),
    name: z.string(),
  }),
  organization: z.object({
    id: z.string(),
    name: z.string(),
  }).optional(),
  organizationId: z.string().optional(),
  status: z.string(),
  leaddate: z.date(),
  sentbyId: z.string(),
  verified: z.boolean().default(false),
  messagesent: z.boolean().default(false),
  comments: z.string().optional().nullable(),
  draftStatus: z.boolean().default(false),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
