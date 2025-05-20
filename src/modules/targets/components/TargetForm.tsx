import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaginatedAutocomplete from "@/components/shared/foreign-key";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Field } from "@/components/hook-form";
import { MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";

interface TargetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Target | null;
}

const TargetForm = ({ open, onOpenChange, initialData }: TargetFormProps) => {
  const { createTarget, updateTarget } = useTargets();
  // const { users } = useUsers();
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
        handledById: initialData.handledBy?.id || "",
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
          ? initialData.responseReceived === 'YES'
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Target" : "Create a New Target"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-5 py-2">
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

              <FormItem>
                <FormLabel>User *</FormLabel>
                <PaginatedAutocomplete
                  value={form.watch("handledById")}
                  onChange={(val) => form.setValue("handledById", val)}
                  endpoint="/api/auth/"
                  placeholder="Select User"
                  dataField="users"
                  getLabel={(user) => `${user.firstName} ${user.lastName}`}
                  getValue={(user) => user.id}
                />
              </FormItem>


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

              <FormItem>
                <FormLabel>Status</FormLabel>
                <Field.Select name="status" >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">In Active</MenuItem>
                  <MenuItem value="OnHold">On Hold</MenuItem>
                </Field.Select>
              </FormItem>

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

              <FormItem>
                <FormLabel>Created Date</FormLabel>
                <Controller
                  name="createdDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      // label={<>Created Date <span style={{ color: 'red' }}>*</span></>}
                      value={field.value ? dayjs(field.value, 'YYYY/DD/MM').toDate() : null}  // Convert dayjs to Date
                      onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : '')}  // Handle the change and store in ISO format
                      slotProps={{
                        textField: {
                          size: "small",
                          // fullWidth: true,
                          error: !!form.formState.errors.createdDate,
                          helperText: form.formState.errors.createdDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </FormItem>


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
        {/* </ScrollArea> */}
        {/* </DialogContent> */}
      </Dialog>
    </LocalizationProvider>
  );
};

export default TargetForm;
