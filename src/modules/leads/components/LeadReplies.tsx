
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { leadReplyService } from "../services/leadReplyService";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { LeadReply } from "../types/leadReply";

interface LeadRepliesProps {
  leadId: string;
}

export function LeadReplies({ leadId }: LeadRepliesProps) {
  const [reply, setReply] = useState("");
  const [replierId, setReplierId] = useState("");
  const queryClient = useQueryClient();
  const { users } = useUsers();

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["leadReplies", leadId],
    queryFn: () => leadReplyService.getLeadReplies(leadId),
  });

  const { mutate: createReply } = useMutation({
    mutationFn: leadReplyService.createLeadReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      setReply("");
      setReplierId("");
      toast.success("Reply added successfully");
    },
    onError: () => {
      toast.error("Failed to add reply");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !replierId) {
      toast.error("Please fill in all fields");
      return;
    }
    
    createReply({
      reply,
      replierId,
      leadId
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {replies.map((reply: LeadReply) => (
          <div key={reply.id} className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Replied by {reply.replier.email} | {format(new Date(reply.replyDate), "yyyy-MM-dd")}
            </p>
            <p className="text-sm">{reply.reply}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Add Reply</h3>
          <Select
            value={replierId}
            onValueChange={setReplierId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select replier" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Type your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Add Reply
        </Button>
      </form>
    </div>
  );
}
