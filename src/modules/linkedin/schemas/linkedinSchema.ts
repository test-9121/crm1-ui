
import * as z from "zod";

export const linkedinSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  .optional(),
  designation: z.string().min(2, "Designation is required"),
  country: z.string().min(2, "Country is required"),
  connectionsCount: z.coerce.number().int().min(0, "Connections must be a positive number"),
  status: z.string().min(2, "Status is required"),
  handledById: z.string().min(1, "Handler is required"),
  organizationId: z.string().optional(),
});
