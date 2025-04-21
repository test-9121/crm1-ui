
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useCMSMail } from "@/modules/cms/hooks/useCMSMail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { FileEdit, ArrowLeft } from "lucide-react";

export default function CMSMailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { getMailById } = useCMSMail();
  const mailQuery = getMailById(id || "");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            View Mail
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={() => navigate(`/cms-mail/edit/${id}`)}>
              <FileEdit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </div>

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
            <BreadcrumbLink>View</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {mailQuery.isLoading ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading mail data...</p>
          </div>
        ) : mailQuery.isError ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-red-500">Error loading mail data. Please try again.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Subject</h2>
                    <p>{mailQuery.data?.subject}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Created</h2>
                    <p>{format(new Date(mailQuery.data?.createdDateTime || ""), "PPpp")}</p>
                  </div>
                  {mailQuery.data?.lastUpdatedDateTime && (
                    <div>
                      <h2 className="text-lg font-semibold">Last Updated</h2>
                      <p>{format(new Date(mailQuery.data.lastUpdatedDateTime), "PPpp")}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Content</h2>
                <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
                  {mailQuery.data?.content}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
