
import { useState } from "react";
import { format } from "date-fns";
import { MessageSquarePlus, Trash2, Edit, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LeadReply } from "../types/leadReply";
import { leadReplyService } from "../services/leadReplyService";
import { leadResponseService } from "../services/leadResponseService";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface LeadReplyCardProps {
  reply: LeadReply;
  users: any[];
  leadId: string;
  onUpdate: () => void;
}

export default function LeadReplyCard({ reply, users, leadId, onUpdate }: LeadReplyCardProps) {
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const queryClient = useQueryClient();

  // Form for adding a new response
  const responseForm = useForm({
    defaultValues: {
      response: "",
      responderId: users[0]?.id || "",
    },
  });

  // Form for editing a reply
  const editReplyForm = useForm({
    defaultValues: {
      replyText: reply.replyText,
      replierId: reply.replierId || users[0]?.id || "",
    },
  });

  // Delete reply mutation
  const deleteReplyMutation = useMutation({
    mutationFn: () => leadReplyService.deleteLeadReply(reply.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      toast.success("Reply deleted successfully");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to delete reply");
    },
  });

  // Update reply mutation
  const updateReplyMutation = useMutation({
    mutationFn: (data: any) => {
      return leadReplyService.updateLeadReply(reply.id, {
        ...data,
        leadId,
        replyAt: reply.replyAt,
        parentReplyId: reply.parentReplyId,
        replier: users.find(user => user.id === data.replierId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      setIsEditingReply(false);
      toast.success("Reply updated successfully");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update reply");
    },
  });

  // Create response mutation
  const createResponseMutation = useMutation({
    mutationFn: (data: any) => {
      return leadResponseService.createLeadResponse({
        ...data,
        replyId: reply.id,
        respondAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      responseForm.reset();
      setShowResponseInput(false);
      toast.success("Response added successfully");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to add response");
    },
  });

  const handleDeleteReply = () => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      deleteReplyMutation.mutate();
    }
  };

  const handleUpdateReply = async (data: any) => {
    await updateReplyMutation.mutateAsync(data);
  };

  const handleAddResponse = async (data: any) => {
    setIsSubmittingResponse(true);
    try {
      await createResponseMutation.mutateAsync(data);
    } finally {
      setIsSubmittingResponse(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main reply content */}
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          {isEditingReply ? (
            <Form {...editReplyForm}>
              <form onSubmit={editReplyForm.handleSubmit(handleUpdateReply)} className="space-y-4">
                <FormField
                  control={editReplyForm.control}
                  name="replyText"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Edit your reply..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editReplyForm.control}
                  name="replierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          {users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.email}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-2 justify-end">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditingReply(false)}
                    type="button"
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    type="submit"
                  >
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <p className="text-base">{reply.replyText}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Replied by {reply.replier?.email}</span>
                  <span>|</span>
                  <span>{format(new Date(reply.replyAt), "yyyy-MM-dd")}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setIsEditingReply(true)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-500 hover:text-red-600"
                    onClick={handleDeleteReply}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setShowResponseInput(!showResponseInput)}
                  >
                    <MessageSquarePlus className="h-4 w-4" />
                    Respond
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Response input form */}
      {showResponseInput && (
        <div className="ml-8 border-l-2 border-muted pl-6 rounded-lg border bg-muted/30 p-4">
          <Form {...responseForm}>
            <form onSubmit={responseForm.handleSubmit(handleAddResponse)} className="space-y-3">
              <FormField
                control={responseForm.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your response..." 
                        className="min-h-[80px] bg-background" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={responseForm.control}
                name="responderId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.email}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-2 justify-end">
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowResponseInput(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  type="submit"
                  disabled={isSubmittingResponse}
                >
                  Submit Response
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* Nested responses display */}
      {reply.leadresponses && reply.leadresponses.length > 0 && (
        <div className="ml-8 space-y-4 border-l-2 border-muted pl-6">
          <h4 className="font-medium">Responses</h4>
          {reply.leadresponses.map((response) => (
            <div key={response.id} className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm">{response.response}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                {response.respondAt && format(new Date(response.respondAt), "yyyy-MM-dd")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
