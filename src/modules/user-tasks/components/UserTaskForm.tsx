
import { useForm } from "react-hook-form";
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
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? "Edit User Task" : "Create a New User Task"}
        </DialogTitle>
      </DialogHeader>
      {/* <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto custom-scrollbar"> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2 px-5">

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
                      type="datetime-local"
                      value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
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
                      type="datetime-local"
                      value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
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


// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery } from "@tanstack/react-query";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/sonner";
// import { userTaskSchema, UserTaskFormValues } from "@/modules/user-tasks/schemas/userTaskSchema";
// import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
// import { UserTask } from "@/modules/user-tasks/types";
// import { format } from "date-fns";
// import { useUsers } from "@/modules/users/hooks/useUsers";
// import { useLeads } from "@/modules/leads/hooks/useLeads";
// import { leadService } from "@/modules/leads/services/leadService";

// interface UserTaskFormProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   initialData?: UserTask | null;
// }

// const UserTaskForm = ({ open, onOpenChange, initialData }: UserTaskFormProps) => {
//   const { createUserTask, updateUserTask } = useUserTasks();
//   const { users } = useUsers();
//   // const { allLeads } = useLeads();
//   const isEditMode = !!initialData;

//   // Form hook
//   const form = useForm<UserTaskFormValues>({
//     resolver: zodResolver(userTaskSchema),
//     defaultValues: {
//       userId: "",
//       name: "",
//       description: "",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//       priority: "Medium",
//       status: "Pending",
//       leadId: ""
//     },
//   });

//   // State for pagination
//   const [pagination, setPagination] = useState({ page: 0, size: 500 });

//   // Fetch leads with pagination
//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["leads", pagination.page, pagination.size],
//     queryFn: () => leadService.getLeads(pagination.page, pagination.size),
//     // onError: (error) => toast.error("Failed to fetch leads. Please try again later."),
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.reset({
//         userId: initialData.user?.id || "",
//         leadId: initialData.lead?.id || "",
//         name: initialData.name,
//         description: initialData.description,
//         startDate: initialData.startDate,
//         endDate: initialData.endDate,
//         priority: initialData.priority,
//         status: initialData.status,
//       });
//     } else {
//       form.reset({
//         userId: "",
//         name: "",
//         description: "",
//         startDate: new Date().toISOString(),
//         endDate: new Date().toISOString(),
//         priority: "Medium",
//         status: "Pending",
//         leadId: ""
//       });
//     }
//   }, [initialData, form]);

//   // Handle pagination when scrolling
//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const target = e.target as HTMLDivElement; // Typecast to HTMLDivElement
//     const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;

//     console.log('hxhs', bottom)

//     // If scrolled to the bottom, fetch the next set of records
//     if (bottom && data && data.pagination.pageNumber < data.pagination.totalPages) {
//       setPagination((prev) => {
//         const nextPage = prev.page + 1; // Increment page
//         refetch(); // Refetch leads for the next page
//         return { ...prev, page: nextPage };
//       });
//     }
//   };

//   // Submit handler
//   const onSubmit = async (data: UserTaskFormValues) => {
//     try {
//       if (isEditMode && initialData) {
//         await updateUserTask.mutateAsync({
//           id: initialData.id,
//           data,
//         });
//       } else {
//         await createUserTask.mutateAsync(data);
//       }
//       onOpenChange(false);
//     } catch (error) {
//       toast.error("An error occurred while saving the task");
//       console.error(error);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto custom-scrollbar" onScroll={handleScroll}>
//         <DialogHeader>
//           <DialogTitle>
//             {isEditMode ? "Edit User Task" : "Create a New User Task"}
//           </DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* User Field */}
//             <FormField
//               control={form.control}
//               name="userId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>User *</FormLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a user" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {users?.map((user) => (
//                         <SelectItem key={user.id} value={user.id}>
//                           {user.firstName} {user.lastName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Task Name Field */}
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Task Name *</FormLabel>
//                   <FormControl>
//                     <Input {...field} autoComplete="off" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Description Field */}
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description *</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} rows={3} className="resize-none" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Lead Field */}
//             <FormField
//               control={form.control}
//               name="leadId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Associated Lead</FormLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a lead" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem key="no-lead" value="none">
//                         None
//                       </SelectItem>
//                       {data?.data.map((lead) => (
//                         <SelectItem key={lead.id} value={lead.id}>
//                           {lead.firstname} {lead.lastname}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Date and Time Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Start Date and Time *</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="datetime-local"
//                         value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
//                         onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>End Date and Time *</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="datetime-local"
//                         value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
//                         onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Priority Field */}
//               <FormField
//                 control={form.control}
//                 name="priority"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Priority *</FormLabel>
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select priority" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="Low">Low</SelectItem>
//                         <SelectItem value="Medium">Medium</SelectItem>
//                         <SelectItem value="High">High</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Status Field */}
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status *</FormLabel>
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="Pending">Pending</SelectItem>
//                         <SelectItem value="InProgress">In Progress</SelectItem>
//                         <SelectItem value="Completed">Completed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Dialog Footer */}
//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => onOpenChange(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {isEditMode ? "Update Task" : "Create Task"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserTaskForm;


// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery } from "@tanstack/react-query";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/sonner";
// import { userTaskSchema, UserTaskFormValues } from "@/modules/user-tasks/schemas/userTaskSchema";
// import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
// import { UserTask } from "@/modules/user-tasks/types";
// import { format } from "date-fns";
// import { useUsers } from "@/modules/users/hooks/useUsers";
// import { useLeads } from "@/modules/leads/hooks/useLeads";
// import { leadService } from "@/modules/leads/services/leadService";

// interface UserTaskFormProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   initialData?: UserTask | null;
// }

// const UserTaskForm = ({ open, onOpenChange, initialData }: UserTaskFormProps) => {
//   const { createUserTask, updateUserTask } = useUserTasks();
//   const { users } = useUsers();
//   // const { allLeads } = useLeads();
//   const isEditMode = !!initialData;

//   // Form hook
//   const form = useForm<UserTaskFormValues>({
//     resolver: zodResolver(userTaskSchema),
//     defaultValues: {
//       userId: "",
//       name: "",
//       description: "",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//       priority: "Medium",
//       status: "Pending",
//       leadId: ""
//     },
//   });

//   // State for pagination
//   const [pagination, setPagination] = useState({ page: 0, size: 500 });

//   // Fetch leads with pagination
//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["leads", pagination.page, pagination.size],
//     queryFn: () => leadService.getLeads(pagination.page, pagination.size),
//     meta: {
//       onError: (error: Error) => {
//         toast.error("Failed to fetch leads. Please try again later.");
//         console.error("Error fetching leads:", error);
//       }
//     }
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.reset({
//         userId: initialData.user?.id || "",
//         leadId: initialData.lead?.id || "",
//         name: initialData.name,
//         description: initialData.description,
//         startDate: initialData.startDate,
//         endDate: initialData.endDate,
//         priority: initialData.priority,
//         status: initialData.status,
//       });
//     } else {
//       form.reset({
//         userId: "",
//         name: "",
//         description: "",
//         startDate: new Date().toISOString(),
//         endDate: new Date().toISOString(),
//         priority: "Medium",
//         status: "Pending",
//         leadId: ""
//       });
//     }
//   }, [initialData, form]);

//   // Scroll reference for the dropdown
//   const selectContentRef = useRef<HTMLDivElement | null>(null);

//   // Handle pagination when scrolling
//   const handleScroll = () => {
//     const target = selectContentRef.current;
//     if (target) {
//       const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;

//       // If scrolled to the bottom, fetch the next set of records
//       if (bottom && data && data.pagination.pageNumber < data.pagination.totalPages) {
//         setPagination((prev) => {
//           const nextPage = prev.page + 1; // Increment page
//           refetch(); // Refetch leads for the next page
//           return { ...prev, page: nextPage };
//         });
//       }
//     }
//   };

//   // Submit handler
//   const onSubmit = async (data: UserTaskFormValues) => {
//     try {
//       if (isEditMode && initialData) {
//         await updateUserTask.mutateAsync({
//           id: initialData.id,
//           data,
//         });
//       } else {
//         await createUserTask.mutateAsync(data);
//       }
//       onOpenChange(false);
//     } catch (error) {
//       toast.error("An error occurred while saving the task");
//       console.error(error);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto custom-scrollbar">
//         <DialogHeader>
//           <DialogTitle>
//             {isEditMode ? "Edit User Task" : "Create a New User Task"}
//           </DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* User Field */}
//             <FormField
//               control={form.control}
//               name="userId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>User *</FormLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a user" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {users?.map((user) => (
//                         <SelectItem key={user.id} value={user.id}>
//                           {user.firstName} {user.lastName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Task Name Field */}
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Task Name *</FormLabel>
//                   <FormControl>
//                     <Input {...field} autoComplete="off" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Description Field */}
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description *</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} rows={3} className="resize-none" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Lead Field */}
//             <FormField
//               control={form.control}
//               name="leadId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Associated Lead</FormLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a lead" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent ref={selectContentRef} onScroll={handleScroll}>
//                       {data?.data.map((lead) => (
//                         <SelectItem key={lead.id} value={lead.id}>
//                           {lead.firstname} {lead.lastname}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Date and Time Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Start Date and Time *</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="datetime-local"
//                         value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
//                         onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>End Date and Time *</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="datetime-local"
//                         value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ""}
//                         onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Priority Field */}
//               <FormField
//                 control={form.control}
//                 name="priority"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Priority *</FormLabel>
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select priority" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="Low">Low</SelectItem>
//                         <SelectItem value="Medium">Medium</SelectItem>
//                         <SelectItem value="High">High</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Status Field */}
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status *</FormLabel>
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="Pending">Pending</SelectItem>
//                         <SelectItem value="InProgress">In Progress</SelectItem>
//                         <SelectItem value="Completed">Completed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Dialog Footer */}
//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => onOpenChange(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {isEditMode ? "Update Task" : "Create Task"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserTaskForm;



// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   // Box,

// } from "@mui/material";

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { userTaskSchema, UserTaskFormValues } from "@/modules/user-tasks/schemas/userTaskSchema";
// import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
// import { UserTask } from "@/modules/user-tasks/types";
// import { useUsers } from "@/modules/users/hooks/useUsers";
// import { toast } from "@/components/ui/sonner";
// import { format } from "date-fns";
// import PaginatedAutocomplete from "@/components/shared/foreign-key";

// interface UserTaskFormProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   initialData?: UserTask | null;
// }

// const UserTaskForm = ({ open, onOpenChange, initialData }: UserTaskFormProps) => {
//   const { createUserTask, updateUserTask } = useUserTasks();
//   const { users } = useUsers();
//   const isEditMode = !!initialData;

//   const form = useForm<UserTaskFormValues>({
//     resolver: zodResolver(userTaskSchema),
//     defaultValues: {
//       userId: "",
//       name: "",
//       description: "",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//       priority: "Medium",
//       status: "Pending",
//       leadId: ""
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.reset({
//         userId: initialData.user?.id || "",
//         leadId: initialData.lead?.id || "",
//         name: initialData.name,
//         description: initialData.description,
//         startDate: initialData.startDate,
//         endDate: initialData.endDate,
//         priority: initialData.priority,
//         status: initialData.status,
//       });
//     }
//   }, [initialData, form]);

//   const onSubmit = async (data: UserTaskFormValues) => {
//     try {
//       if (isEditMode && initialData) {
//         await updateUserTask.mutateAsync({ id: initialData.id, data });
//       } else {
//         await createUserTask.mutateAsync(data);
//       }
//       onOpenChange(false);
//     } catch (error) {
//       toast.error("An error occurred while saving the task");
//       console.error(error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={() => onOpenChange(false)}
//       fullWidth
//       maxWidth="sm"
//       PaperProps={{ sx: { maxWidth: 720 } }}
//     >
//       <DialogTitle>
//         {isEditMode ? "Edit User Task" : "Create a New User Task"}
//       </DialogTitle>
//       <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
//         <DialogContent dividers>
//           <Box
//             rowGap={3}
//             columnGap={2}
//             display="grid"
//             gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
//           >
//             {/* <Grid sx={{xs:6}}> */}
//             <TextField
//               select
//               fullWidth
//               label="User *"
//               {...form.register("userId")}
//               value={form.watch("userId")}
//               onChange={(e) => form.setValue("userId", e.target.value)}
//               error={!!form.formState.errors.userId}
//               helperText={form.formState.errors.userId?.message}
//             >
//               {users?.map((user) => (
//                 <MenuItem key={user.id} value={user.id}>
//                   {user.firstName} {user.lastName}
//                 </MenuItem>
//               ))}
//             </TextField>
//             {/* </Grid> */}

//             {/* <Grid sx={{xs:12}}> */}
//             <TextField
//               fullWidth
//               label="Task Name *"
//               {...form.register("name")}
//               value={form.watch("name")}
//               onChange={(e) => form.setValue("name", e.target.value)}
//               error={!!form.formState.errors.name}
//               helperText={form.formState.errors.name?.message}
//             />
//             {/* </Grid> */}

//             {/* <Grid item xs={12}> */}
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Description *"
//               {...form.register("description")}
//               value={form.watch("description")}
//               onChange={(e) => form.setValue("description", e.target.value)}
//               error={!!form.formState.errors.description}
//               helperText={form.formState.errors.description?.message}
//             />
//             {/* </Grid> */}

//             {/* <Grid item xs={12}> */}

//             <PaginatedAutocomplete
//               value={form.watch("leadId")}
//               onChange={(val) => form.setValue("leadId", val)}
//               endpoint="/api/leads/"
//               placeholder="Select lead"
//               getLabel={(lead) => `${lead.firstname} ${lead.lastname}`}
//               getValue={(lead) => lead.id}
//             />
//             {/* </Grid> */}

//             {/* <Grid item xs={6}> */}
//             <TextField
//               fullWidth
//               type="datetime-local"
//               label="Start Date and Time *"
//               value={format(new Date(form.watch("startDate")), "yyyy-MM-dd'T'HH:mm")}
//               onChange={(e) =>
//                 form.setValue("startDate", new Date(e.target.value).toISOString())
//               }
//               error={!!form.formState.errors.startDate}
//               helperText={form.formState.errors.startDate?.message}
//             />
//             {/* </Grid> */}

//             {/* <Grid item xs={6}> */}
//             <TextField
//               fullWidth
//               type="datetime-local"
//               label="End Date and Time *"
//               value={format(new Date(form.watch("endDate")), "yyyy-MM-dd'T'HH:mm")}
//               onChange={(e) =>
//                 form.setValue("endDate", new Date(e.target.value).toISOString())
//               }
//               error={!!form.formState.errors.endDate}
//               helperText={form.formState.errors.endDate?.message}
//             />
//             {/* </Grid> */}

//             {/* <Grid item xs={6}> */}
//             <TextField
//               select
//               fullWidth
//               label="Priority *"
//               {...form.register("priority")}
//               value={form.watch("priority")}
//               onChange={(e) => form.setValue("priority", e.target.value)}
//               error={!!form.formState.errors.priority}
//               helperText={form.formState.errors.priority?.message}
//             >
//               <MenuItem value="Low">Low</MenuItem>
//               <MenuItem value="Medium">Medium</MenuItem>
//               <MenuItem value="High">High</MenuItem>
//             </TextField>
//             {/* </Grid> */}

//             {/* <Grid item xs={6}> */}
//             <TextField
//               select
//               fullWidth
//               label="Status *"
//               {...form.register("status")}
//               value={form.watch("status")}
//               onChange={(e) => form.setValue("status", e.target.value)}
//               error={!!form.formState.errors.status}
//               helperText={form.formState.errors.status?.message}
//             >
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="InProgress">In Progress</MenuItem>
//               <MenuItem value="Completed">Completed</MenuItem>
//             </TextField>
//             {/* </Grid> */}
//             {/* </Grid> */}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => onOpenChange(false)} variant="outlined" color="secondary">
//             Cancel
//           </Button>
//           <Button type="submit" variant="contained">
//             {isEditMode ? "Update Task" : "Create Task"}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default UserTaskForm;
