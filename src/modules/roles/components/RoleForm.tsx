
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { roleSchema, RoleFormValues } from "@/modules/roles/schemas/roleSchema";
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Role, RolePermission } from "@/modules/roles/types";

interface RoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Role | null;
}

const RoleForm = ({ open, onOpenChange, initialData }: RoleFormProps) => {
  const { createRole, updateRole } = useRoles();
  const isEditMode = !!initialData;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: "",
      roleDescription: "",
      rolePermission: "ROLE_USER" as RolePermission,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        roleName: initialData.roleName,
        roleDescription: initialData.roleDescription,
        rolePermission: initialData.rolePermission,
      });
    } else {
      form.reset({
        roleName: "",
        roleDescription: "",
        rolePermission: "ROLE_USER" as RolePermission,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: RoleFormValues) => {
    try {
      if (isEditMode && initialData) {
        // If in edit mode, update the role
        await updateRole.mutateAsync({
          id: initialData.id,
          data: {
            roleName: data.roleName,
            roleDescription: data.roleDescription,
            rolePermission: data.rolePermission,
          },
        });
        onOpenChange(false);
      } else {
        // If not in edit mode, create a new role
        await createRole.mutateAsync({
          roleName: data.roleName,
          roleDescription: data.roleDescription,
          rolePermission: data.rolePermission,
        });
        onOpenChange(false);
      }
  
      // Close the form after successful submission
     

      form.reset();
  
    } catch (error) {
      // Handle error and keep the form open
      toast.error("An error occurred while saving the role");
      console.error("Form submission error:", error);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Role" : "Create a New Role"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name *</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roleDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rolePermission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Permission *</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a permission level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ROLE_SUPER_ADMIN">SUPER ADMIN</SelectItem>
                      <SelectItem value="ROLE_ADMIN">ADMIN</SelectItem>
                      <SelectItem value="ROLE_USER">USER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleForm;
