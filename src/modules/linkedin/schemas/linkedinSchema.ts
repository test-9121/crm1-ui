
import * as z from "zod";

export const linkedinSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().optional(),
  designation: z.string().min(2, "Designation is required"),
  country: z.string().min(2, "Country is required"),
  connectionsCount: z.coerce.number().int().min(0, "Connections must be a positive number"),
  status: z.string().min(2, "Status is required"),
  handledById: z.string().min(1, "Handler is required"),
  organizationId: z.string().min(1, "Organization is required")
});
