
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { leadReplyService } from "../services/leadReplyService";
import { LeadReply, LeadResponse } from "../types/leadReply";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, MessageSquare, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import LeadResponsesRow from "./LeadResponsesRow";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LeadRepliesRowProps {
  leadId: string;
  onEditReply?: (reply: LeadReply) => void;
  onEditResponse?: (response: LeadResponse, replyId: string) => void;
}

const LeadRepliesRow: React.FC<LeadRepliesRowProps> = ({ leadId, onEditReply, onEditResponse }) => {
  const [expandedReplyIds, setExpandedReplyIds] = useState<string[]>([]);
  const [replyToDelete, setReplyToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["leadReplies", leadId],
    queryFn: () => leadReplyService.getLeadReplies(leadId),
  });

  const toggleReplyExpansion = (replyId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedReplyIds(prev => 
      prev.includes(replyId) 
        ? prev.filter(id => id !== replyId) 
        : [...prev, replyId]
    );
  };

  const handleDeleteReply = (replyId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setReplyToDelete(replyId);
  };

  const confirmDeleteReply = async () => {
    if (replyToDelete) {
      try {
        await leadReplyService.deleteLeadReply(replyToDelete);
        queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
        toast.success("Reply deleted successfully");
      } catch (error) {
        console.error("Error deleting reply:", error);
        toast.error("Failed to delete reply");
      }
      setReplyToDelete(null);
    }
  };

  const handleEditReplyClick = (reply: LeadReply, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onEditReply) {
      onEditReply(reply);
    }
  };

  const handleEditResponseClick = (response: LeadResponse, replyId: string) => {
    if (onEditResponse) {
      onEditResponse(response, replyId);
    }
  };

  if (isLoading) {
    return <div className="py-4 text-center text-sm text-muted-foreground">Loading replies...</div>;
  }

  if (!replies || replies.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">
        No replies for this lead.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
        <MessageSquare className="h-4 w-4" />
        Lead Replies ({replies.length})
      </h3>
      <div className="space-y-2">
        {replies.map((reply: LeadReply) => (
          <div 
            key={reply.id} 
            className="border rounded-md bg-background"
          >
            <div 
              className="p-3 flex justify-between items-center cursor-pointer"
              onClick={(e) => toggleReplyExpansion(reply.id, e)}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => toggleReplyExpansion(reply.id, e)}
                >
                  {expandedReplyIds.includes(reply.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                <div>
                  <div className="font-medium text-sm">{reply.replyText.substring(0, 60)}...</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>{reply.replier?.email || "Unknown user"}</span>
                    <span>•</span>
                    <span>{format(new Date(reply.replyAt), "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="ml-2">
                  {reply.leadresponses?.length || 0} responses
                </Badge>
                
                {onEditReply && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-1"
                    onClick={(e) => handleEditReplyClick(reply, e)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-600"
                  onClick={(e) => handleDeleteReply(reply.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Responses section */}
            {expandedReplyIds.includes(reply.id) && (
              <div className="border-t px-4 py-3 bg-muted/20">
                <LeadResponsesRow 
                  reply={reply} 
                  onEditResponse={response => handleEditResponseClick(response, reply.id)} 
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Reply Confirmation Dialog */}
      <AlertDialog open={!!replyToDelete} onOpenChange={() => setReplyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reply</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this reply and all its responses? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteReply}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LeadRepliesRow;
