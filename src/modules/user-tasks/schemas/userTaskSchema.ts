
import { z } from "zod";

export const userTaskSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  leadId: z.string().min(1, { message: "Lead is required" }),
  name: z.string().min(1, { message: "Task name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string(),
  endDate: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Pending", "InProgress", "Completed"]),
});

export type UserTaskFormValues = z.infer<typeof userTaskSchema>;
