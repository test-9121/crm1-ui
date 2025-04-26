
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { leadReplyService } from "../services/leadReplyService";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { LeadReply } from "../types/leadReply";
import LeadReplyCard from "./LeadReplyCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MessageSquarePlus } from "lucide-react";

interface LeadRepliesProps {
  leadId: string;
}

export function LeadReplies({ leadId }: LeadRepliesProps) {
  const { users } = useUsers();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form for adding a new reply
  const form = useForm({
    defaultValues: {
      replyText: "",
      replierId: users[0]?.id || "",
    },
  });

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["leadReplies", leadId],
    queryFn: () => leadReplyService.getLeadReplies(leadId),
  });

  // Create reply mutation
  const createReplyMutation = useMutation({
    mutationFn: (data: any) => {
      return leadReplyService.createLeadReply({
        ...data,
        leadId,
        replyAt: new Date().toISOString(),
        replier: users.find(user => user.id === data.replierId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
      form.reset();
      toast.success("Reply added successfully");
    },
    onError: () => {
      toast.error("Failed to add reply");
    }
    // onSuccess: (response) => {
    //   if (response.success) {
    //     queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] });
    //     form.reset();
    //   }
    // }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await createReplyMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Lead Replies</h2>
      </div>

      {/* Replies list */}
      <div className="space-y-6">
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
              onUpdate={() => queryClient.invalidateQueries({ queryKey: ["leadReplies", leadId] })}
            />
          ))
        )}
      </div>

      {/* Add Reply Form directly in UI */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <h3 className="font-medium">Add a New Reply</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="replyText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your reply here..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
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
            
            <Button 
              type="submit" 
              className="w-full flex items-center gap-2"
              disabled={isSubmitting}
            >
              <MessageSquarePlus className="h-4 w-4" />
              Submit Reply
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
