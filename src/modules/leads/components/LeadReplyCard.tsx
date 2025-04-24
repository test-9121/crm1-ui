
import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash2, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import LeadReplyFormDialog from "./LeadReplyFormDialog";
import { LeadReply } from "../types/leadReply";
import { leadReplyService } from "../services/leadReplyService";
import { leadResponseService } from "../services/leadResponseService";

interface LeadReplyCardProps {
  reply: LeadReply;
  users: any[];
  leadId: string;
  onReplyAdded: () => void;
}

export default function LeadReplyCard({ reply, users, leadId, onReplyAdded }: LeadReplyCardProps) {
  const [responseOpen, setResponseOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this reply?")) return;
    
    setLoading(true);
    try {
      // Determine whether to delete as reply or response
      if (reply.parentReplyId) {
        await leadResponseService.deleteLeadResponse(reply.id);
      } else {
        await leadReplyService.deleteLeadReply(reply.id);
      }
      toast.success("Reply deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Failed to delete reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 pl-2">
      <div>
        <p className="font-bold text-lg mb-0">{reply.replyText}</p>
        <div className="flex flex-wrap items-center text-muted-foreground text-base gap-2">
          <span>
            Replied by <span className="font-medium">{reply.replier.email || "Unknown"}</span> | {reply.replyAt ? format(new Date(reply.replyAt), "yyyy-MM-dd") : ""}
          </span>
          <Edit 
            size={20} 
            className="mx-1 cursor-pointer text-muted-foreground hover:text-primary" 
            onClick={() => setEditOpen(true)}
          />
          <Trash2 
            size={20} 
            className="mx-1 cursor-pointer text-muted-foreground hover:text-red-600" 
            onClick={handleDelete}
            style={{ opacity: loading ? 0.5 : 1 }}
          />
          <Button variant="link" className="ml-2 font-semibold text-base px-0 py-0" onClick={() => setResponseOpen(true)}>
            <MessageSquarePlus size={20} className="mr-1" />
            Add Response
          </Button>
        </div>
      </div>

      {/* Nested responses */}
      <div className="border-l-2 border-muted pl-4 mt-6">
        <h4 className="font-semibold text-xl mb-4">Responses</h4>
        {reply.leadresponses && reply.leadresponses.length > 0 ? (
          reply.leadresponses.map((resp) => (
            <div key={resp.id} className="mb-4">
              <div className="text-lg">{resp.replyText}</div>
              <div className="text-muted-foreground text-sm">
                Response by: {resp.replier?.email || "Unknown"} | 
                {resp.replyAt && format(new Date(resp.replyAt), "yyyy-MM-dd")}
              </div>
              <div className="flex gap-2 mt-2">
                <Edit 
                  size={18} 
                  className="cursor-pointer hover:text-primary" 
                  onClick={() => {
                    // We could implement nested edit here or reuse the same component
                    toast.info("Edit response feature coming soon");
                  }}
                />
                <Trash2 
                  size={18} 
                  className="cursor-pointer hover:text-red-600"
                  onClick={async () => {
                    if (!confirm("Delete this response?")) return;
                    
                    try {
                      await leadResponseService.deleteLeadResponse(resp.id);
                      toast.success("Response deleted");
                      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
                    } catch (error) {
                      toast.error("Failed to delete response");
                      console.error(error);
                    }
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground italic">No responses.</div>
        )}
      </div>

      {/* Add Response Dialog */}
      <LeadReplyFormDialog
        open={responseOpen}
        onOpenChange={setResponseOpen}
        leadId={leadId}
        users={users}
        parentReply={reply}
        replierId={users.length > 0 ? users[0].id : ""}
        onSuccess={() => {
          onReplyAdded();
          queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
        }}
      />

      {/* Edit Reply Dialog */}
      <LeadReplyFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        leadId={leadId}
        users={users}
        initialData={reply}
        replierId={reply.replierId}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
        }}
      />
    </div>
  );
}
