
import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash2, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadReplyFormDialog from "./LeadReplyFormDialog";
import { LeadReply } from "../types/leadReply";

interface LeadReplyCardProps {
  reply: LeadReply;
  users: any[];
  leadId: string;
  onReplyAdded: () => void;
  // Optional: hooks for handling delete/edit
}

export default function LeadReplyCard({ reply, users, leadId, onReplyAdded }: LeadReplyCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 pl-2">
      <div>
        <p className="font-bold text-lg mb-0">{reply.replyText}</p>
        <div className="flex flex-wrap items-center text-muted-foreground text-base gap-2">
          <span>
            Replied by <span className="font-medium">{reply.replier.email || "Unknown"}</span> | {reply.replyAt ? format(new Date(reply.replyAt), "yyyy-MM-dd") : ""}
          </span>
          <Edit size={20} className="mx-1 cursor-pointer text-muted-foreground hover:text-primary" />
          <Trash2 size={20} className="mx-1 cursor-pointer text-muted-foreground hover:text-red-600" />
          <Button variant="link" className="ml-2 font-semibold text-base px-0 py-0" onClick={() => setOpen(true)}>
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
              <div className="text-muted-foreground text-sm">Response Date: {resp.replyAt && format(new Date(resp.replyAt), "yyyy-MM-dd")}</div>
              <div className="flex gap-2 mt-2">
                <Edit size={18} className="cursor-pointer" />
                <Trash2 size={18} className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground italic">No responses.</div>
        )}
      </div>

      {/* Add Response Dialog */}
      <LeadReplyFormDialog
        open={open}
        onOpenChange={setOpen}
        leadId={leadId}
        users={users}
        parentReply={reply}
        replierId={users.length > 0 ? users[0].id : ""}
        onSuccess={onReplyAdded}
      />
    </div>
  );
}
