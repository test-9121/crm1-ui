
import { useState } from "react";
import { format } from "date-fns";
import { MessageSquarePlus, Trash2, Edit, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LeadReply, LeadResponse } from "../types/leadReply";
import { leadReplyService } from "../services/leadReplyService";
import { leadResponseService } from "../services/leadResponseService";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [responseToEdit, setResponseToEdit] = useState<LeadResponse | null>(null);
  const [responseToDelete, setResponseToDelete] = useState<string | null>(null);
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

  // Form for editing a response
  const editResponseForm = useForm({
    defaultValues: {
      response: "",
      responderId: users[0]?.id || "",
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

  // Update response mutation
  const updateResponseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => {
      return leadResponseService.updateLeadResponse(id, {
        ...data,
        replyId: reply.id,
        respondAt: responseToEdit?.respondAt || new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      setResponseToEdit(null);
      toast.success("Response updated successfully");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update response");
    },
  });

  // Delete response mutation
  const deleteResponseMutation = useMutation({
    mutationFn: (responseId: string) => leadResponseService.deleteLeadResponse(responseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      setResponseToDelete(null);
      toast.success("Response deleted successfully");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to delete response");
    },
  });

  const handleDeleteReply = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReply = async () => {
    setShowDeleteConfirm(false);
    await deleteReplyMutation.mutateAsync();
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

  const handleEditResponse = (response: LeadResponse) => {
    setResponseToEdit(response);
    editResponseForm.setValue('response', response.response);
    editResponseForm.setValue('responderId', users[0]?.id || "");
  };

  const handleUpdateResponse = async (data: any) => {
    if (responseToEdit) {
      await updateResponseMutation.mutateAsync({
        id: responseToEdit.id,
        data
      });
    }
  };

  const handleDeleteResponse = (responseId: string) => {
    setResponseToDelete(responseId);
  };

  const confirmDeleteResponse = async () => {
    if (responseToDelete) {
      await deleteResponseMutation.mutateAsync(responseToDelete);
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

      {/* Edit Response Form */}
      {responseToEdit && (
        <div className="ml-8 border-l-2 border-muted pl-6 rounded-lg border bg-muted/30 p-4">
          <Form {...editResponseForm}>
            <form onSubmit={editResponseForm.handleSubmit(handleUpdateResponse)} className="space-y-3">
              <FormField
                control={editResponseForm.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Edit your response..." 
                        className="min-h-[80px] bg-background" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={editResponseForm.control}
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
                  onClick={() => setResponseToEdit(null)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  type="submit"
                >
                  Update Response
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
              <div className="flex justify-between">
                <p className="text-sm">{response.response}</p>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleEditResponse(response)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
              <div className="mt-2 text-xs text-muted-foreground">
                {response.respondAt && format(new Date(response.respondAt), "yyyy-MM-dd")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Reply Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this reply and all its responses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteReply} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Response Confirmation Dialog */}
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
            <AlertDialogAction onClick={confirmDeleteResponse} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
