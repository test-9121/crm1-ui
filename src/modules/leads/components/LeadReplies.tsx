
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leadReplyService } from "../services/leadReplyService";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { LeadReply } from "../types/leadReply";
import { Button } from "@/components/ui/button";
import LeadReplyCard from "./LeadReplyCard";
import LeadReplyFormDialog from "./LeadReplyFormDialog";

// TypeScript: Remove the use of `id` in the form payload for create
// Also, implement per design: list replies, button for Add Response, dialog appears as modal, show nested responses.

interface LeadRepliesProps {
  leadId: string;
}

export function LeadReplies({ leadId }: LeadRepliesProps) {
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const queryClient = useQueryClient();
  const { users } = useUsers();

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["leadReplies", leadId],
    queryFn: () => leadReplyService.getLeadReplies(leadId),
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
  };

  // Only show top-level replies (leadresponses are nested in each)
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold flex-1">Lead Replies</h2>
          <Button onClick={() => setAddReplyOpen(true)} variant="default">
            Add Response
          </Button>
        </div>
        {/* Top-level replies */}
        {isLoading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : replies.length === 0 ? (
          <div className="text-center text-muted-foreground">No replies yet.</div>
        ) : (
          replies.map((reply: LeadReply) => (
            <LeadReplyCard
              key={reply.id}
              reply={reply}
              users={users}
              leadId={leadId}
              onReplyAdded={handleRefetch}
            />
          ))
        )}
      </div>
      {/* Global Add Response dialog for top-level replies (no parentReply) */}
      <LeadReplyFormDialog
        open={addReplyOpen}
        onOpenChange={setAddReplyOpen}
        leadId={leadId}
        users={users}
        onSuccess={handleRefetch}
      />
    </div>
  );
}
