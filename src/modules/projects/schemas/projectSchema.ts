
import * as z from "zod";
import { ProjectStatus } from "@/modules/projects/types";

export const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
