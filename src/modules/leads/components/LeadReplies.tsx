
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { leadReplyService } from "../services/leadReplyService";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { LeadReply } from "../types/leadReply";
import LeadReplyCard from "./LeadReplyCard";
import LeadReplyFormDialog from "./LeadReplyFormDialog";

interface LeadRepliesProps {
  leadId: string;
}

export function LeadReplies({ leadId }: LeadRepliesProps) {
  const [showNewReplyForm, setShowNewReplyForm] = useState(false);
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

  return (
    <div className="space-y-8">
      {/* Add Reply Form at the top */}
      <LeadReplyFormDialog
        open={showNewReplyForm}
        onOpenChange={setShowNewReplyForm}
        leadId={leadId}
        users={users}
        onSuccess={handleRefetch}
      />

      {/* Display replies with nested responses */}
      <div>
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
    </div>
  );
}
