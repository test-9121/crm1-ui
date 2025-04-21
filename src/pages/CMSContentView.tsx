
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useCMSContent } from "@/modules/cms/hooks/useCMSContent";
import { Button } from "@/components/ui/button";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { FileEdit, ArrowLeft, Eye } from "lucide-react";
import { useState } from "react";
import { CMSContent } from "@/modules/cms/types";
import { FetchErrorState } from "@/components/shared/FetchErrorState";

export default function CMSContentView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { getContentById } = useCMSContent();
  const contentQuery = getContentById(id || "");
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<CMSContent | null>(null);

  const handleViewContent = (content: CMSContent) => {
    setSelectedContent(content);
    setIsViewPanelOpen(true);
  };

  if (contentQuery.isError) {
    return (
      <DashboardLayout>
        <FetchErrorState 
          message="Failed to load content data. Please try again later." 
          onRetry={() => contentQuery.refetch()} 
        />
      </DashboardLayout>
    );
  }

  const renderContentPanel = (content: CMSContent) => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{content.title}</h2>
          <Button onClick={() => navigate(`/cms/edit/${content.id}`)}>
            <FileEdit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
        
        {content.coverUrl && (
          <img 
            src={content.coverUrl} 
            alt={content.title} 
            className="w-full max-h-64 object-cover rounded-lg"
          />
        )}
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{content.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Created</h3>
                <p>{format(new Date(content.createdDateTime || ""), "PPpp")}</p>
              </div>
              {content.lastUpdatedDateTime && (
                <div>
                  <h3 className="text-lg font-semibold">Last Updated</h3>
                  <p>{format(new Date(content.lastUpdatedDateTime), "PPpp")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
              {content.content}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">SEO Metadata</h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium">Meta Title</h4>
                <p className="text-gray-700">{content.metaTitle || "-"}</p>
              </div>
              <div>
                <h4 className="font-medium">Meta Description</h4>
                <p className="text-gray-700">{content.metaDescription || "-"}</p>
              </div>
              <div>
                <h4 className="font-medium">Meta Keywords</h4>
                <p className="text-gray-700">{content.metaKeywords || "-"}</p>
              </div>
              <div>
                <h4 className="font-medium">Meta Tags</h4>
                <p className="text-gray-700">{content.metaTags || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            View Content
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={() => contentQuery.data && handleViewContent(contentQuery.data)}>
              <Eye className="mr-2 h-4 w-4" /> View in Panel
            </Button>
            <Button onClick={() => navigate(`/cms/edit/${id}`)}>
              <FileEdit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </div>

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
            <BreadcrumbLink>View</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {contentQuery.isLoading ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading content data...</p>
          </div>
        ) : contentQuery.data ? (
          <div className="space-y-6">
            {contentQuery.data?.coverUrl && (
              <img 
                src={contentQuery.data.coverUrl} 
                alt={contentQuery.data.title} 
                className="w-full max-h-64 object-cover rounded-lg"
              />
            )}
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Title</h2>
                    <p>{contentQuery.data?.title}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Description</h2>
                    <p>{contentQuery.data?.description}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Created</h2>
                    <p>{format(new Date(contentQuery.data?.createdDateTime || ""), "PPpp")}</p>
                  </div>
                  {contentQuery.data?.lastUpdatedDateTime && (
                    <div>
                      <h2 className="text-lg font-semibold">Last Updated</h2>
                      <p>{format(new Date(contentQuery.data.lastUpdatedDateTime), "PPpp")}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Content</h2>
                <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
                  {contentQuery.data?.content}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">SEO Metadata</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Meta Title</h3>
                    <p>{contentQuery.data?.metaTitle || "-"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Meta Description</h3>
                    <p>{contentQuery.data?.metaDescription || "-"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Meta Keywords</h3>
                    <p>{contentQuery.data?.metaKeywords || "-"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Meta Tags</h3>
                    <p>{contentQuery.data?.metaTags || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      {/* Side panel for content viewing */}
      <DetailsSidePanel
        data={selectedContent}
        open={isViewPanelOpen}
        onClose={() => setIsViewPanelOpen(false)}
        renderContent={renderContentPanel}
      />
    </DashboardLayout>
  );
}
