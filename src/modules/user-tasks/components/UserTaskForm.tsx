
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { userTaskSchema, UserTaskFormValues } from "@/modules/user-tasks/schemas/userTaskSchema";
import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
import { UserTask } from "@/modules/user-tasks/types";
import { format } from "date-fns";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import PaginatedAutocomplete from "@/components/shared/foreign-key";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Field } from "@/components/hook-form";
import { MenuItem } from "@mui/material";
// import PaginatedSelect from "@/components/shared/foreign-key";

interface UserTaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserTask | null;
}

const UserTaskForm = ({ open, onOpenChange, initialData }: UserTaskFormProps) => {
  const { createUserTask, updateUserTask } = useUserTasks();
  const { users } = useUsers();
  // const { allLeads } = useLeads();
  const isEditMode = !!initialData;

  const form = useForm<UserTaskFormValues>({
    resolver: zodResolver(userTaskSchema),
    defaultValues: {
      userId: "",
      name: "",
      description: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      priority: "Medium",
      status: "Pending",
      leadId: ""
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        userId: initialData.user?.id || "",
        leadId: initialData.lead?.id || "",
        name: initialData.name,
        description: initialData.description,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        priority: initialData.priority,
        status: initialData.status,
      });
    } else {
      form.reset({
        userId: "",
        name: "",
        description: "",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        priority: "Medium",
        status: "Pending",
        leadId: ""
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: UserTaskFormValues) => {
    try {
      if (isEditMode && initialData) {
        await updateUserTask.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createUserTask.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("An error occurred while saving the task");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} >
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? "Edit User Task" : "Create a New User Task"}
        </DialogTitle>
      </DialogHeader>
      {/* <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto custom-scrollbar"> */}

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3 px-5 sm:w-[500px] max-h-[90vh]">

          <FormItem>
            <FormLabel>User *</FormLabel>
            <PaginatedAutocomplete
              value={form.watch("userId")}
              onChange={(val) => form.setValue("userId", val)}
              endpoint="/api/auth/"
              placeholder="Select User"
              dataField="users"
              getLabel={(user) => `${user.firstName} ${user.lastName}`}
              getValue={(user) => user.id}
            />
          </FormItem>



          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name *</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
              control={form.control}
              name="leadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Lead</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lead" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="no-lead" value="none">None</SelectItem>
                      {allLeads?.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.firstname} {lead.lastname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}


          <FormItem>
            <FormLabel>Lead</FormLabel>
            <PaginatedAutocomplete
              value={form.watch("leadId")}
              onChange={(val) => form.setValue("leadId", val)}
              endpoint="/api/leads/"
              placeholder="Select lead"
              dataField="leads"
              getLabel={(lead) => `${lead.firstname} ${lead.lastname}`}
              getValue={(lead) => lead.id}
            />
          </FormItem>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date and Time *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

      
                <FormItem>
                  <FormLabel>Priority *</FormLabel>
                  <Field.Select name="priority" >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Field.Select>
                </FormItem>




            <FormItem>
              <FormLabel>Status</FormLabel>
              <Field.Select name="status" >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Field.Select>
            </FormItem>

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
              {isEditMode ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
      {/* </DialogContent> */}
    </Dialog>
  );
};

export default UserTaskForm;
