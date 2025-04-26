
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  roleId: z.string().min(1, "Role is required"),
  organizationId: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  company: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  department: z.string().optional(),
  location: z.string().optional(),
  jobTitle: z.string().optional(),
  password: z.string().optional(),
  avatarUrl: z.string().optional().nullable(),
  disabled: z.boolean().default(false),
  verified: z.boolean().default(false),
  emailVerified: z.boolean().default(false),
});

export type UserFormValues = z.infer<typeof userSchema>;
