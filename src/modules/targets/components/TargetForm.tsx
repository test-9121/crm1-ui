
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { targetSchema, TargetFormValues } from "@/modules/targets/schemas/targetSchema";
import { useTargets } from "@/modules/targets/hooks/useTargets";
import { Target, TargetStatus } from "@/modules/targets/types";
import { Switch } from "@/components/ui/switch";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TargetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Target | null;
}

const TargetForm = ({ open, onOpenChange, initialData }: TargetFormProps) => {
  const { createTarget, updateTarget } = useTargets();
  const { users } = useUsers();
  const isEditMode = !!initialData;

  const form = useForm<TargetFormValues>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      accountName: "",
      connectionsCount: 0,
      handledById: "",
      noOfLeadsIdentified: 0,
      connectionsSent: 0,
      messagesSent: 0,
      status: "Active",
      followUps: 0,
      createdDate: new Date().toISOString(),
      inMailCount: 0,
      postings: 0,
      meetingsScheduled: 0,
      responseReceived: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        accountName: initialData.accountName,
        connectionsCount: initialData.connectionsCount,
        handledById: typeof initialData.handledById === 'object' ? initialData.handledById.id : initialData.handledById,
        noOfLeadsIdentified: initialData.noOfLeadsIdentified,
        connectionsSent: initialData.connectionsSent,
        messagesSent: initialData.messagesSent,
        status: initialData.status,
        followUps: initialData.followUps,
        createdDate: initialData.createdDate,
        inMailCount: initialData.inMailCount,
        postings: initialData.postings,
        meetingsScheduled: initialData.meetingsScheduled,
        responseReceived: typeof initialData.responseReceived === 'string' 
          ? initialData.responseReceived === 'true'
          : !!initialData.responseReceived,
      });
    } else {
      form.reset({
        accountName: "",
        connectionsCount: 0,
        handledById: "",
        noOfLeadsIdentified: 0,
        connectionsSent: 0,
        messagesSent: 0,
        status: "Active",
        followUps: 0,
        createdDate: new Date().toISOString(),
        inMailCount: 0,
        postings: 0,
        meetingsScheduled: 0,
        responseReceived: false,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: TargetFormValues) => {
    try {
      if (isEditMode && initialData) {
        await updateTarget.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createTarget.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("An error occurred while saving the target");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Target" : "Create a New Target"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name *</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="connectionsCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connections Count *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="handledById"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handled By *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a handler" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noOfLeadsIdentified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leads Identified *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="connectionsSent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connections Sent *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messagesSent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Messages Sent *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="InActive">InActive</SelectItem>
                        <SelectItem value="OnHold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followUps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow Ups *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createdDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Created Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inMailCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>InMail Count *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postings *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meetingsScheduled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meetings Scheduled *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responseReceived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Response Received</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Target" : "Create Target"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TargetForm;
