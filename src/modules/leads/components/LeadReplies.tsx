
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { leadReplyService } from "../services/leadReplyService";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { LeadReply } from "../types/leadReply";
import { Button } from "@/components/ui/button";
import LeadReplyCard from "./LeadReplyCard";
import LeadReplyFormDialog from "./LeadReplyFormDialog";

interface LeadRepliesProps {
  leadId: string;
}

export function LeadReplies({ leadId }: LeadRepliesProps) {
  const [addReplyOpen, setAddReplyOpen] = useState(false);
  const queryClient = useQueryClient();
  const { users } = useUsers();

  // Use React Query for automatic cache management and refetching
  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["leadReplies", leadId],
    queryFn: () => leadReplyService.getLeadReplies(leadId),
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
  };

  // Only show top-level replies (responses are nested in each)
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold flex-1">Lead Replies</h2>
          <Button onClick={() => setAddReplyOpen(true)} variant="default">
            Add Reply
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
      {/* Add Reply Dialog */}
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
