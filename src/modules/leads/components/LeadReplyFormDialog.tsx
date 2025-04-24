
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { leadReplyService } from "../services/leadReplyService";
import { leadResponseService } from "../services/leadResponseService";
import { toast } from "@/components/ui/sonner";
import { LeadReplyFormData, LeadReply } from "../types/leadReply";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadReplyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadId: string;
  users: any[];
  replierId?: string;
  parentReply?: LeadReply;
  initialData?: LeadReply;
  onSuccess: () => void;
}

export default function LeadReplyFormDialog({
  open, 
  onOpenChange, 
  leadId, 
  users, 
  replierId = "", 
  parentReply,
  initialData,
  onSuccess,
}: LeadReplyFormDialogProps) {
  const [replyText, setReplyText] = useState("");
  const [selectedReplierId, setSelectedReplierId] = useState(replierId);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;
  
  // Initialize form with data when editing
  useEffect(() => {
    if (initialData && open) {
      setReplyText(initialData.replyText);
      setSelectedReplierId(initialData.replierId);
      setDate(initialData.replyAt ? new Date(initialData.replyAt) : new Date());
    }
  }, [initialData, open]);

  // Reset form when dialog opens/closes
  const handleOpenChange = (newOpen: boolean) => {
    // Only reset when closing the dialog
    if (!newOpen) {
      if (!isEditing) {
        setReplyText("");
        setSelectedReplierId(replierId);
        setDate(new Date());
      }
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReplierId || !replyText.trim() || !date) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const replierUser = users.find((u) => u.id === selectedReplierId);
    if (!replierUser) {
      toast.error("Invalid replier selected");
      return;
    }

    setLoading(true);
    
    try {
      const formData: LeadReplyFormData = {
        leadId,
        replyText,
        replyAt: date.toISOString(),
        replierId: selectedReplierId,
        replier: replierUser,
        parentReplyId: parentReply?.id,
      };

      if (isEditing) {
        // Update existing reply or response
        if (initialData?.parentReplyId) {
          await leadResponseService.updateLeadResponse(initialData.id, formData);
        } else {
          await leadReplyService.updateLeadReply(initialData!.id, formData);
        }
        toast.success("Updated successfully");
      } else {
        // Create new reply or response
        if (parentReply) {
          await leadResponseService.createLeadResponse(formData);
          toast.success("Response added successfully");
        } else {
          await leadReplyService.createLeadReply(formData);
          toast.success("Reply added successfully");
        }
      }
      
      handleOpenChange(false);
      onSuccess();
    } catch (e) {
      console.error("Error saving:", e);
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} ${parentReply ? 'response' : 'reply'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6 w-full max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold">
          {isEditing ? 'Edit' : 'Add'} {parentReply ? 'Response' : 'Reply'}
        </h3>
        <div>
          <Textarea
            placeholder={`Add your ${parentReply ? 'response' : 'reply'} here`}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Reply To</label>
          <input
            readOnly
            className="w-full px-3 py-2 rounded border bg-gray-50"
            value={parentReply?.replyText || ""}
            placeholder="No parent"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Response Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                <CalendarIcon className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Replier</label>
          <Select value={selectedReplierId} onValueChange={setSelectedReplierId}>
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
        <div className="flex gap-3 pt-3">
          <Button 
            type="submit" 
            className="w-40" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              isEditing ? "Update" : "Add"
            )}
          </Button>
          <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
