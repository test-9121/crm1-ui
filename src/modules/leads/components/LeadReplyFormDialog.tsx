// This component is deprecated and no longer used.
// Reply forms are now integrated directly into the LeadReplies and LeadReplyCard components.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LeadReply } from "../types/leadReply";
import { leadReplyService } from "../services/leadReplyService";
import { leadResponseService } from "../services/leadResponseService";
import { toast } from "@/components/ui/sonner";

interface LeadReplyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadId: string;
  users: any[];
  parentReply?: LeadReply;
  onSuccess?: () => void;
}

export default function LeadReplyFormDialog({
  open,
  onOpenChange,
  leadId,
  users,
  parentReply,
  onSuccess,
}: LeadReplyFormDialogProps) {
  // Keep existing code (deprecated component)
  return null; // Return null as this component is no longer used
}
