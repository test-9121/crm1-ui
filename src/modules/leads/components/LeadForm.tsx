import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

import {
  ILead,
  Industry,
  Designation,
  User,
  Organization,
  Status,
  Empcount
} from "@/modules/leads/types";
import { leadFormSchema, type LeadFormValues } from "@/modules/leads/schemas/leadSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadReplies } from "./LeadReplies";
import PaginatedAutocomplete from "@/components/shared/foreign-key";
import { DialogHeader } from "@/components/ui/dialog";
import { Field } from "@/components/hook-form";
import { MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LeadFormValues) => Promise<any>;
  initialData?: ILead | null;
  industries: Industry[];
  designations: Designation[];
  users: User[];
  organizations: Organization[];
}

export function LeadForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  industries,
  designations,
  users,
  organizations
}: LeadFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      linkedin: "",
      website: "",
      region: "",
      empCount: "0-10",
      status: "New",
      leaddate: new Date().toISOString(),
      industry: { id: "", name: "" },
      designation: { id: "", name: "" },
      organization: { id: "", name: "" },
      sentById: "",
      verified: false,
      messageSent: false,
      comments: "",
      draftStatus: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        linkedin: initialData.linkedin || "",
        website: initialData.website || "",
        region: initialData.region || "",
        empCount: initialData.empCount || "0-10",
        status: initialData.status || "New",
        leaddate: initialData.leaddate ? initialData.leaddate : "",
        industry: initialData.industry ? {
          id: initialData.industry.id,
          name: initialData.industry.name
        } : { id: "", name: "" },
        designation: initialData.designation ? {
          id: initialData.designation.id,
          name: initialData.designation.name
        } : { id: "", name: "" },
        organization: initialData.organization ? {
          id: initialData.organization.id,
          name: initialData.organization.name
        } : { id: "", name: "" },
        sentById: initialData.sentBy?.id || "",
        verified: initialData.verified || false,
        messageSent: initialData.messageSent || false,
        comments: initialData.comments || "",
        draftStatus: initialData.draftStatus || false,
        industryId: initialData.industry?.id || ""
      });
    } else {
      form.reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        linkedin: "",
        website: "",
        region: "",
        empCount: "0-10",
        status: "New",
        leaddate: new Date().toISOString(),
        industry: { id: "", name: "" },
        designation: { id: "", name: "" },
        organization: { id: "", name: "" },
        sentById: "",
        verified: false,
        messageSent: false,
        comments: "",
        draftStatus: false,
        industryId: ""
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: LeadFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await onSubmit(data);

      if (response && response.success) {
        form.reset();
        onOpenChange(false);
        toast.success(initialData ? "Lead updated successfully" : "Lead created successfully");
      } else {
        if (response && response.error) {
          toast.error(response.error);
        } else {
          toast.error("Failed to save lead. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || "An error occurred while saving the lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!isSubmitting) {
      if (!open) {
        form.reset();
      }
      onOpenChange(open);
    }
  };

  const employeeCountOptions: Empcount[] = [
    'Self Employed', '0-10', '11-50', '51-100', '101-200',
    '201-500', '501-1,000', '1,001-2,000', '2,001-3,000',
    '3,001-5,000', '5,001-10,000', '10,001+'
  ];

  const statusOptions: Status[] = [
    'New', 'Contacted', 'Qualified', 'Lost', 'Won', 'Unqualified'
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={() => handleDialogClose(false)}>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Lead" : "Add New Lead"}
          </DialogTitle>
          {/* <DialogDescription>
            {initialData ? "Update the lead information below." : "Fill in the details to create a new lead."}
          </DialogDescription> */}
        </DialogHeader>

        <Tabs defaultValue="details" className=" py-2 px-5 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Lead Details</TabsTrigger>
            <TabsTrigger value="replies" disabled={!initialData}>Replies</TabsTrigger>
          </TabsList>


          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">

                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <PaginatedAutocomplete
                      value={form.watch("industryId")}
                      onChange={(val) => form.setValue("industryId", val)}
                      endpoint="/api/industries"
                      // placeholder="Select Industry"
                      dataField="industries"
                      getLabel={(industry) => `${industry.name}`}
                      getValue={(industry) => industry.id}
                    />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Designation *</FormLabel>
                    <PaginatedAutocomplete
                      value={form.watch("designation.id")}
                      onChange={(val) => form.setValue("designation.id", val)}
                      endpoint="/api/designations/"
                      // placeholder="Select Designation"
                      dataField="designations"
                      getLabel={(designation) => `${designation.name}`}
                      getValue={(designation) => designation.id}
                    />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input placeholder="LinkedIn profile URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Company website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Field.Select name="empCount" >
                      {employeeCountOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Field.Select>

                  </FormItem>

                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Field.Select name="status" >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  </FormItem>

                  {/* <FormField
                  control={form.control}
                  name="leaddate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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
                                format(field.value, "PPP")
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
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                  <FormItem>
                    <FormLabel>Lead Date</FormLabel>
                    <Controller
                      name="leaddate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker
                          // label={<>Created Date <span style={{ color: 'red' }}>*</span></>}
                          value={field.value ? dayjs(field.value, 'YYYY/DD/MM').toDate() : null}  // Convert dayjs to Date
                          onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : '')}  // Handle the change and store in ISO format
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!form.formState.errors.leaddate,
                              helperText: form.formState.errors.leaddate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Sent By *</FormLabel>
                    <PaginatedAutocomplete
                      value={form.watch("sentById")}
                      onChange={(val) => form.setValue("sentById", val)}
                      endpoint="/api/auth/"
                      // placeholder="Select User"
                      dataField="users"
                      getLabel={(user) => `${user.firstName} ${user.lastName}`}
                      getValue={(user) => user.id}
                    />
                  </FormItem>

                </div>

                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="verified"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Verified</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="messageSent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Message Sent</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional comments..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => handleDialogClose(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.setValue('draftStatus', true);
                      form.handleSubmit(handleSubmit)();
                    }}
                    disabled={isSubmitting}
                  >
                    Save as Draft
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : (initialData ? "Update Lead" : "Create Lead")}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="replies">
            {initialData && <LeadReplies leadId={initialData.id} />}
          </TabsContent>
        </Tabs>
      </Dialog >
    </LocalizationProvider >
  );
}
