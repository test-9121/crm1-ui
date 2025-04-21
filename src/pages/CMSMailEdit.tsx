
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { CMSMailForm } from "@/modules/cms/components/CMSMailForm";
import { useCMSMail } from "@/modules/cms/hooks/useCMSMail";
import { CMSMailFormValues } from "@/modules/cms/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function CMSMailEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isCreating = !id || id === "create";
  
  const { getMailById, createMail, updateMail } = useCMSMail();
  const mailQuery = getMailById(id || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CMSMailFormValues) => {
    try {
      setIsSubmitting(true);
      if (isCreating) {
        await createMail.mutateAsync(values);
        toast({
          title: "Success",
          description: "Mail created successfully",
        });
      } else if (id) {
        await updateMail.mutateAsync({ id, mailData: values });
        toast({
          title: "Success",
          description: "Mail updated successfully",
        });
      }
      navigate("/cms-mail/list");
    } catch (error) {
      console.error("Error saving mail:", error);
      toast({
        title: "Error",
        description: "Failed to save mail. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {isCreating ? "Create a new mail" : "Edit mail"}
        </h1>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/cms-mail/list">CMS Mail</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              {isCreating ? "Create" : "Edit"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {mailQuery.isLoading && !isCreating ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading mail data...</p>
          </div>
        ) : mailQuery.isError && !isCreating ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-red-500">Error loading mail data. Please try again.</p>
          </div>
        ) : (
          <CMSMailForm
            isEdit={!isCreating}
            defaultValues={isCreating ? undefined : {
              subject: mailQuery.data?.subject || "",
              content: mailQuery.data?.content || "",
            }}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
