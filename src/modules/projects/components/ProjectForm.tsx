import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";


import { toast } from "@/components/ui/sonner";
import { projectSchema } from "@/modules/projects/schemas/projectSchema";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { Project, ProjectFormValues } from "@/modules/projects/types";

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Project | null;
}

const ProjectForm = ({ open, onOpenChange, initialData }: ProjectFormProps) => {
  const { createProject, updateProject } = useProjects();
  const isEditMode = !!initialData;

  // Define default values that fully satisfy the ProjectFormValues type
  const defaultValues: ProjectFormValues = {
    name: "",
    description: "",
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      // Ensure all required fields are present when setting form values
      form.reset({
        name: initialData.name,
        description: initialData.description,
      });
    } else {
      // Reset to default values
      form.reset(defaultValues);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      if (isEditMode && initialData) {
        await updateProject.mutateAsync({
          id: initialData.id,
          data,
        });
        toast.success("Project updated successfully");
      } else {
        await createProject.mutateAsync(data);
        toast.success("Project created successfully");
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("An error occurred while saving the project");
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      form.reset(defaultValues);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Project" : "Create a New Project"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the project information below." : "Fill in the details to create a new project."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
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
                  <FormLabel>Project Description *</FormLabel>
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
                disabled={createProject.isPending || updateProject.isPending}
              >
                {isEditMode ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
