
import * as z from "zod";
import { RolePermission } from "@/modules/roles/types";

export const roleSchema = z.object({
  roleName: z.string().min(2, "Name must be at least 2 characters"),
  roleDescription: z.string().min(10, "Description must be at least 10 characters"),
  rolePermission: z.enum(["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_USER"] as [RolePermission, ...RolePermission[]])
});

export type RoleFormValues = z.infer<typeof roleSchema>;
