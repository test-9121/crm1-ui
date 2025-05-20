import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "@/modules/organizations/types";
import { useOrganizations } from "@/modules/organizations/hooks/useOrganizations";
import { organizationSchema, OrganizationFormValues } from "@/modules/organizations/schemas/organizationSchema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrganizationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Organization | null;
}

export function OrganizationForm({ open, onOpenChange, initialData }: OrganizationFormProps) {
  const { createOrganization, updateOrganization } = useOrganizations();
  
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      domain: "",
      description: "",
      disabled: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        domain: initialData.domain || "",
        description: initialData.description || "",
        disabled: initialData.disabled || false,
      });
    } else {
      form.reset({
        name: "",
        domain: "",
        description: "",
        disabled: false,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: OrganizationFormValues) => {
    try {
      if (initialData?.id) {
        await updateOrganization.mutateAsync({ 
          id: initialData.id, 
          data: values 
        });
        // Close the form after successful update
        onOpenChange(false);
      } else {
        await createOrganization.mutateAsync(values);
        // Close the form after successful creation
        onOpenChange(false);
      }
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      // Keep form open if there's an error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Organization" : "Create Organization"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter domain" {...field} />
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
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter description" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disabled</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="false">No</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1e293b] hover:bg-[#334155]">
                {initialData ? "Update Organization" : "Create Organization"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
