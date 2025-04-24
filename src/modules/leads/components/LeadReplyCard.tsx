
import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash2, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
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
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Failed to delete reply");
    } finally {
      setLoading(false);
    }
  };

  // Safe access to replier information with fallbacks
  const replierEmail = reply.replier?.email || "Unknown User";
  const replyDate = reply.replyAt ? format(new Date(reply.replyAt), "yyyy-MM-dd") : "";

  return (
    <div className="my-6 pl-2">
      <div>
        <p className="font-bold text-lg mb-0">{reply.replyText}</p>
        <div className="flex flex-wrap items-center text-muted-foreground text-base gap-2">
          <span>
            Replied by <span className="font-medium">{replierEmail}</span> | {replyDate}
          </span>
          <Edit 
            size={20} 
            className="mx-1 cursor-pointer text-muted-foreground hover:text-primary" 
            onClick={() => setEditOpen(true)}
          />
          <Trash2 
            size={20} 
            className="mx-1 cursor-pointer text-muted-foreground hover:text-red-600" 
            onClick={() => setDeleteDialogOpen(true)}
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
            <LeadReplyCard 
              key={resp.id} 
              reply={resp} 
              users={users} 
              leadId={leadId}
              onReplyAdded={onReplyAdded}
            />
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
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this {reply.parentReplyId ? 'response' : 'reply'}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
