
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Event, EventFormValues } from "../types";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { User } from "@/modules/users/types";
// import { ILead } from "@/modules/leads/types";
// import { useQuery } from "@tanstack/react-query";
// import { usersApi } from "@/lib/api";
// import { leadsApi } from "@/lib/api";
// import { ColorPicker, COLOR_MAP, ColorName } from "./ColorPicker";

// const eventFormSchema = z.object({
//   title: z.string().min(1, { message: "Title is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   notes: z.string().optional(),
//   startDate: z.string().min(1, { message: "Start date is required" }),
//   endDate: z.string().min(1, { message: "End date is required" }),
//   allDay: z.boolean().optional(),
//   leadId: z.string().optional(),
//   userId: z.string().optional(),
//   color: z.string().optional(),
// });

// export interface EventModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   event: Event | null;
//   isCreating: boolean;
//   onCreateEvent: (values: EventFormValues) => Promise<void>;
//   onUpdateEvent: (id: string, values: EventFormValues) => Promise<void>;
//   onDeleteEvent: (id: string) => Promise<void>;
//   isLoading?: boolean;
// }

// export function EventModal({
//   isOpen,
//   onClose,
//   event,
//   isCreating,
//   onCreateEvent,
//   onUpdateEvent,
//   onDeleteEvent,
//   isLoading = false
// }: EventModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedColor, setSelectedColor] = useState<ColorName>(event?.color as ColorName || "green");

//   const usersQuery = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const response = await usersApi.getAll();
//       return response || [];
//     }
//   });

//   const leadsQuery = useQuery({
//     queryKey: ["leads"],
//     queryFn: async () => {
//       const response = await leadsApi.getAll();
//       return response.leads || response || [];
//     }
//   });

//   const form = useForm<z.infer<typeof eventFormSchema>>({
//     resolver: zodResolver(eventFormSchema),
//     defaultValues: {
//       title: event?.title || "",
//       description: event?.description || "",
//       notes: event?.notes || "",
//       startDate: event?.startDate || new Date().toISOString().slice(0, 16),
//       endDate: event?.endDate || new Date().toISOString().slice(0, 16),
//       allDay: event?.allDay || false,
//       leadId: event?.leadId || "",
//       userId: event?.userId || "",
//       color: event?.color || "green"
//     },
//   });

//   useEffect(() => {
//     if (event) {
//       setSelectedColor(event.color as ColorName || "green");
//       form.reset({
//         title: event.title || "",
//         description: event.description || "",
//         notes: event.notes || "",
//         startDate: event.startDate || new Date().toISOString().slice(0, 16),
//         endDate: event.endDate || new Date().toISOString().slice(0, 16),
//         allDay: event.allDay || false,
//         leadId: event.leadId || "",
//         userId: event.userId || "",
//         color: event.color || "green"
//       });
//     } else {
//       setSelectedColor("green");
//     }
//   }, [event, form]);

//   const handleSubmit = async (values: z.infer<typeof eventFormSchema>) => {
//     try {
//       setIsSubmitting(true);
//       const payload = {
//         ...values,
//         color: selectedColor,
//       };
//       if (isCreating) {
//         await onCreateEvent(payload as EventFormValues);
//       } else if (event?.id) {
//         await onUpdateEvent(event.id, payload as EventFormValues);
//       }
//     } finally {
//       setIsSubmitting(false);
//       onClose();
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setIsSubmitting(true);
//       if (event?.id) {
//         await onDeleteEvent(event.id);
//       }
//     } finally {
//       setIsSubmitting(false);
//       onClose();
//     }
//   };

//   const handleOpenChange = (open: boolean) => {
//     if (!open) {
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogContent className=" max-h-[90vh] overflow-y-auto custom-scrollbar">
//         <DialogHeader>
//           <DialogTitle>{isCreating ? "Add event" : "Edit event"}</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="userId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>User <span className="text-red-500">*</span></FormLabel>
//                   <Select 
//                     onValueChange={field.onChange} 
//                     defaultValue={field.value} 
//                     value={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a user" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {usersQuery.isLoading ? (
//                         <SelectItem value="loading" disabled>Loading users...</SelectItem>
//                       ) : usersQuery.data?.map((user: User) => (
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

//             <FormField
//               control={form.control}
//               name="leadId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Lead <span className="text-red-500">*</span></FormLabel>
//                   <Select 
//                     onValueChange={field.onChange} 
//                     defaultValue={field.value} 
//                     value={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a lead" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {leadsQuery.isLoading ? (
//                         <SelectItem value="loading" disabled>Loading leads...</SelectItem>
//                       ) : leadsQuery.data?.map((lead: ILead) => (
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

//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter event title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Enter event description" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="notes"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Additional Note <span className="text-red-500">*</span></FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Enter additional notes" {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormItem>
//               <FormLabel>Event Color</FormLabel>
//               <ColorPicker
//                 value={selectedColor}
//                 onChange={(color) => {
//                   setSelectedColor(color);
//                   form.setValue("color", color);
//                 }}
//               />
//             </FormItem>

//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Start Date</FormLabel>
//                     <FormControl>
//                       <Input type="datetime-local" {...field} />
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
//                     <FormLabel>End Date</FormLabel>
//                     <FormControl>
//                       <Input type="datetime-local" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter className="gap-2">
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={onClose}
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//               {!isCreating && (
//                 <Button 
//                   type="button" 
//                   variant="destructive" 
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                 >
//                   Delete
//                 </Button>
//               )}
//               <Button 
//                 type="submit" 
//                 disabled={isSubmitting || isLoading}
//               >
//                 {isSubmitting ? "Saving..." : isCreating ? "Save Changes" : "Update"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }




import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Event, EventFormValues } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/modules/users/types";
import { ILead } from "@/modules/leads/types";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { leadsApi } from "@/lib/api";
import { ColorPicker, COLOR_MAP, ColorName } from "./ColorPicker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  additionalNote: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  allDay: z.boolean().optional(),
  leadId: z.string().optional(),
  userId: z.string().optional(),
  color: z.string().optional(),
});

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  isCreating: boolean;
  onCreateEvent: (values: EventFormValues) => Promise<void>;
  onUpdateEvent: (id: string, values: EventFormValues) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function EventModal({
  isOpen,
  onClose,
  event,
  isCreating,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  isLoading = false
}: EventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorName>(event?.color as ColorName || "green");

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await usersApi.getAll();
      return response || [];
    }
  });

  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const response = await leadsApi.getAll();
      return response.leads || response || [];
    }
  });

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      additionalNote: event?.additionalNote || "",
      startDate: event?.startDate || new Date().toISOString().slice(0, 16),
      endDate: event?.endDate || null,
      allDay: event?.allDay || false,
      leadId: event?.lead.id || "",
      userId: event?.userId || "",
      color: event?.color || "green"
    },
  });
  const formatDate = (date: string) => date.slice(0, 16);
  useEffect(() => {
    if (event) {
      setSelectedColor(event.color as ColorName || "green");
      form.reset({
        title: event.title || "",
        description: event.description || "",
        additionalNote: event.additionalNote || "",
        startDate:formatDate(event.startDate)|| new Date().toISOString().slice(0, 16),
        endDate: formatDate(event.endDate) || new Date().toISOString().slice(0, 16),
        allDay: event.allDay || false,
        leadId: event.lead.id || "",  // Bind the leadId
        userId: event.user.id || "",  // Bind the userId
        color: event.color || "green"
      });
    } else {
      setSelectedColor("green");
    }
  }, [event, form]);

  const handleSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...values,
        color: selectedColor,
      };
      if (isCreating) {
        await onCreateEvent(payload as EventFormValues);
      } else if (event?.id) {
        await onUpdateEvent(event.id, payload as EventFormValues);
      }
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      if (event?.id) {
        await onDeleteEvent(event.id);
      }
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>{isCreating ? "Add event" : "Edit event"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User <span className="text-red-500">*</span></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usersQuery.isLoading ? (
                        <SelectItem value="loading" disabled>Loading users...</SelectItem>
                      ) : usersQuery.data?.map((user: User) => (
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
              name="leadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lead <span className="text-red-500">*</span></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lead" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leadsQuery.isLoading ? (
                        <SelectItem value="loading" disabled>Loading leads...</SelectItem>
                      ) : leadsQuery.data?.map((lead: ILead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.firstname} {lead.lastname}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
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
                  <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter event description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Note <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter additional notes" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Event Color</FormLabel>
              <ColorPicker
                value={selectedColor}
                onChange={(color) => {
                  setSelectedColor(color);
                  form.setValue("color", color);
                }}
              />
            </FormItem>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
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
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              {!isCreating && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  Delete
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Saving..." : isCreating ? "Save Changes" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
