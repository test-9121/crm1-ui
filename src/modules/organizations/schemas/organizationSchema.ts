
import * as z from "zod";

export const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  domain: z.string().min(1, "Domain is required"),
  description: z.string().min(1, "Description is required"),
  disabled: z.boolean().default(false),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
