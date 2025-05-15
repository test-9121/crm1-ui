
import React, { useState } from "react";
import { LeadReply, LeadResponse } from "../types/leadReply";
import { format } from "date-fns";
import { MessageSquareText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { leadResponseService } from "../services/leadResponseService";
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

interface LeadResponsesRowProps {
  reply: LeadReply;
  onEditResponse?: (response: LeadResponse) => void;
}

const LeadResponsesRow: React.FC<LeadResponsesRowProps> = ({ reply, onEditResponse }) => {
  const responses = reply.leadresponses || [];
  const [responseToDelete, setResponseToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleDeleteResponse = (responseId: string) => {
    setResponseToDelete(responseId);
  };

  const confirmDelete = async () => {
    if (responseToDelete) {
      try {
        await leadResponseService.deleteLeadResponse(responseToDelete);
        queryClient.invalidateQueries({ queryKey: ["leadReplies"] });
        toast.success("Response deleted successfully");
      } catch (error) {
        console.error("Error deleting response:", error);
        toast.error("Failed to delete response");
      }
      setResponseToDelete(null);
    }
  };

  if (responses.length === 0) {
    return (
      <div className="text-center py-2 text-sm text-muted-foreground">
        No responses to this reply yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-xs flex items-center gap-2 text-muted-foreground">
        <MessageSquareText className="h-3 w-3" />
        Responses ({responses.length})
      </h4>
      
      <div className="space-y-3 pl-4 border-l-2 border-muted">
        {responses.map((response: LeadResponse) => (
          <div key={response.id} className="bg-background rounded-md p-3 text-sm">
            <div className="flex justify-between items-start">
              <div className="mb-2">{response.response}</div>
              <div className="flex space-x-1">
                {/* {onEditResponse && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => onEditResponse(response)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )} */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-red-500 hover:text-red-600" 
                  onClick={() => handleDeleteResponse(response.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{response.responder?.email || "Unknown user"}</span>
              <span>•</span>
              <span>{format(new Date(response.respondAt), "MMM dd, yyyy")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!responseToDelete} onOpenChange={() => setResponseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Response</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this response? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
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

export default LeadResponsesRow;
