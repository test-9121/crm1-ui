
import * as z from "zod";
import { TargetStatus } from "@/modules/targets/types";

export const targetSchema = z.object({
  accountName: z.string().min(2, "Account name must be at least 2 characters"),
  connectionsCount: z.coerce.number().int().nonnegative("Connections count must be a positive number"),
  handledById: z.string().min(1, "Handler is required"),
  noOfLeadsIdentified: z.coerce.number().int().nonnegative("Leads identified must be a positive number"),
  connectionsSent: z.coerce.number().int().nonnegative("Connections sent must be a positive number"),
  messagesSent: z.coerce.number().int().nonnegative("Messages sent must be a positive number"),
  status: z.enum(["Active", "InActive", "OnHold"] as [TargetStatus, ...TargetStatus[]]),
  followUps: z.coerce.number().int().nonnegative("Follow ups must be a positive number"),
  createdDate: z.string().min(1, "Created date is required"),
  inMailCount: z.coerce.number().int().nonnegative("InMail count must be a positive number"),
  postings: z.coerce.number().int().nonnegative("Postings must be a positive number"),
  meetingsScheduled: z.coerce.number().int().nonnegative("Meetings scheduled must be a positive number"),
  responseReceived: z.union([z.boolean(), z.string()]).transform(val => {
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  })
});

export type TargetFormValues = z.infer<typeof targetSchema>;
