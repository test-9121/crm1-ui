
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { CMSContentForm } from "@/modules/cms/components/CMSContentForm";
import { useCMSContent } from "@/modules/cms/hooks/useCMSContent";
import { CMSContentFormValues } from "@/modules/cms/types";
import { useState } from "react";
import { FetchErrorState } from "@/components/shared/FetchErrorState";
import { toast } from "@/hooks/use-toast";

export default function CMSContentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isCreating = !id || id === "create";
  
  const { getContentById, createContent, updateContent } = useCMSContent();
  const contentQuery = getContentById(id || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CMSContentFormValues, coverImage?: File) => {
    setIsSubmitting(true);
    try {
      if (isCreating) {
        await createContent.mutateAsync({ values, coverImage });
        toast({
          title: "Success",
          description: "Content created successfully",
        });
      } else {
        await updateContent.mutateAsync({ id: id!, values, coverImage });
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      }
      navigate("/cms/list");
    } catch (error) {
      console.error("Error submitting content:", error);
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (contentQuery.isError && !isCreating) {
    return (
      <>
        <FetchErrorState 
          message="Failed to load content data. Please try again later." 
          onRetry={() => contentQuery.refetch()} 
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {isCreating ? "Create a new content" : "Edit content"}
        </h1>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/cms/list">CMS Content</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              {isCreating ? "Create" : "Edit"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {contentQuery.isLoading && !isCreating ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading content data...</p>
          </div>
        ) : (
          <CMSContentForm
            isEdit={!isCreating}
            defaultValues={isCreating ? undefined : {
              title: contentQuery.data?.title || "",
              description: contentQuery.data?.description || "",
              content: contentQuery.data?.content || "",
              metaTitle: contentQuery.data?.metaTitle || "",
              metaTags: contentQuery.data?.metaTags || "",
              metaDescription: contentQuery.data?.metaDescription || "",
              metaKeywords: contentQuery.data?.metaKeywords || "",
              coverUrl: contentQuery.data?.coverUrl || "",
            }}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </>
  );
}
