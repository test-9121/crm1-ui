
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { linkedinSchema } from "../schemas/linkedinSchema";
import { LinkedInFormValues, LinkedInProfile } from "../types";
import { useLinkedIn } from "../hooks/useLinkedIn";
import { useUsers, useOrganizations } from "@/modules/common/hooks/useEntities";
import { toast } from "@/components/ui/sonner";

interface LinkedInFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: LinkedInProfile | null;
}

const LinkedInForm = ({ open, onOpenChange, initialData }: LinkedInFormProps) => {
  const { createProfile, updateProfile } = useLinkedIn();
  const { users } = useUsers();
  const { organizations } = useOrganizations();
  const isEditing = !!initialData;

  // Set up form with validation schema
  const form = useForm<LinkedInFormValues>({
    resolver: zodResolver(linkedinSchema),
    defaultValues: {
      accountName: "",
      email: "",
      password: "",
      designation: "",
      country: "",
      connectionsCount: 0,
      status: "Active",
      handledById: "",
      organizationId: "",
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        accountName: initialData.accountName,
        email: initialData.email,
        designation: initialData.designation,
        password: initialData.password,
        country: initialData.country,
        connectionsCount: initialData.connectionsCount,
        status: initialData.status,
        handledById: initialData.handledBy.id,
        organizationId: initialData.organization.id,
      });
    } else {
      form.reset({
        accountName: "",
        email: "",
        password: "",
        designation: "",
        country: "",
        connectionsCount: 0,
        status: "Active",
        handledById: "",
        organizationId: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: LinkedInFormValues) => {
    try {
      if (isEditing && initialData) {
        await updateProfile.mutateAsync({ id: initialData.id, data });
        toast.success("LinkedIn profile updated successfully");
      } else {
        await createProfile.mutateAsync(data);
        toast.success("LinkedIn profile created successfully");
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save LinkedIn profile");
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[540px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit LinkedIn Profile" : "New LinkedIn Profile"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the profile information below." : "Fill in the details to create a new LinkedIn profile."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Account Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password {isEditing ? '' : '*'}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <FormControl>
                        <Input placeholder="Designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="connectionsCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connections Count *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Number of connections"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="In-Active">In-Active</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="handledById"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handled By *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select handler" />
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
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogClose(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createProfile.isPending || updateProfile.isPending}
                >
                  {createProfile.isPending || updateProfile.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInForm;
