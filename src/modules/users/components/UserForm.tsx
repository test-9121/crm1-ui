
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useUserFormData } from "@/modules/users/hooks/useUserFormData";
import { userSchema, UserFormValues } from "@/modules/users/schemas/userSchema";
import { User } from "@/modules/users/types";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: User | null;
}

const UserForm = ({ open, onOpenChange, initialData }: UserFormProps) => {
  const { createUser, updateUser } = useUsers();
  const { roles, organizations, isLoading } = useUserFormData();
  const isEditMode = !!initialData;

  // Update form with initial data when editing
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      roleId: initialData?.role ? initialData.role.id : "",
      organizationId: initialData?.organization ? initialData.organization.id : "",
      phoneNumber: initialData?.phoneNumber || "",
      disabled: initialData ? initialData.disabled : false,
      verified: initialData ? initialData.verified : false,
      emailVerified: initialData ? initialData.emailVerified : false,
      password: "",
      department: initialData?.department || "",
      location: initialData?.location || "",
      jobTitle: initialData?.jobTitle || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      country: initialData?.country || "",
      address: initialData?.address || "",
      zipCode: initialData?.zipCode || "",
      company: initialData?.company || "",
      status: initialData?.status || "active",
      avatarUrl: initialData?.avatarUrl || "",
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        roleId: initialData.role.id,
        organizationId: initialData.organization.id,
        phoneNumber: initialData.phoneNumber,
        disabled: initialData.disabled,
        verified: initialData.verified,
        emailVerified: initialData.emailVerified,
        password: "", // Don't populate password when editing
        department: initialData.department || "",
        location: initialData.location || "",
        jobTitle: initialData.jobTitle || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "",
        address: initialData.address || "",
        zipCode: initialData.zipCode || "",
        company: initialData.company || "",
        status: initialData.status || "active",
        avatarUrl: initialData.avatarUrl || "",
      });
    }
  }, [initialData, form]);

  const onSubmit = (values: UserFormValues) => {
    if (isEditMode && initialData) {
      updateUser.mutate({
        id: initialData.id,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roleId: values.roleId,
          organizationId: values.organizationId,
          phoneNumber: values.phoneNumber,
          disabled: values.disabled,
          verified: values.verified,
          emailVerified: values.emailVerified,
          department: values.department,
          location: values.location,
          jobTitle: values.jobTitle,
          city: values.city,
          state: values.state,
          country: values.country,
          address: values.address,
          zipCode: values.zipCode,
          company: values.company,
          status: values.status,
          avatarUrl: values.avatarUrl,
          ...(values.password ? { password: values.password } : {}),
        },
      });
    } else {
      createUser.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        roleId: values.roleId,
        organizationId: values.organizationId,
        phoneNumber: values.phoneNumber,
        disabled: values.disabled,
        verified: values.verified,
        emailVerified: values.emailVerified,
        department: values.department,
        location: values.location,
        jobTitle: values.jobTitle,
        city: values.city,
        state: values.state,
        country: values.country,
        address: values.address,
        zipCode: values.zipCode,
        company: values.company,
        status: values.status,
        avatarUrl: values.avatarUrl,
        ...(values.password ? { password: values.password } : {}),
      });
    }
    // Close the dialog after submission
    onOpenChange(false);
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit User" : "Create User"}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info Section */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
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
                    <FormLabel className="required">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
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
                    <FormLabel>{isEditMode ? "New Password (Optional)" : "Password"} {!isEditMode && <span className="text-red-500">*</span>}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Section */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
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
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zip code" {...field} />
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
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Organization Info */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter avatar URL" {...field} value={field.value || ""} />
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
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.roleName}
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
                name="organizationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organizations.map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="verified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Is Verified</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Email Verified</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Disabled</FormLabel>
                      <p className="text-sm text-muted-foreground">Disable user account</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createUser.isPending || updateUser.isPending} className="bg-gray-900 hover:bg-gray-800">
                {isEditMode ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
