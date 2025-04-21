
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CMSMailFormValues } from "../types";
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
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const mailFormSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

interface CMSMailFormProps {
  defaultValues?: Partial<CMSMailFormValues>;
  isEdit?: boolean;
  onSubmit: (values: CMSMailFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function CMSMailForm({
  defaultValues,
  isEdit = false,
  onSubmit,
  isLoading = false,
}: CMSMailFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof mailFormSchema>>({
    resolver: zodResolver(mailFormSchema),
    defaultValues: {
      subject: defaultValues?.subject || "",
      content: defaultValues?.content || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof mailFormSchema>) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values as CMSMailFormValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Mail Details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Subject and content for the mail
            </p>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mail Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mail subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Mail Content</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write something awesome..."
                        className="min-h-72 p-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading || isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {(isLoading || isSubmitting) ? "Saving..." : isEdit ? "Update Mail" : "Create Mail"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
