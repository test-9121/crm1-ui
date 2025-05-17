
import React from "react";
import { format } from "date-fns";
import { Project } from "@/modules/projects/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Building2, CalendarDays } from "lucide-react";

interface ProjectDetailsPanelContentProps {
  project: Project;
}

const ProjectDetailsPanelContent = ({ project }: ProjectDetailsPanelContentProps) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
        <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{project.name}</h2>
            <Badge className={cn("px-2 py-1 w-fit", getStatusColor(project.status))}>
              {project.status || "Planning"}
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="bg-muted p-3 rounded-md">{project.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Organization</h3>
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="font-medium">{project.organization.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">
                  {project.startDate ? format(new Date(project.startDate), "PPP") : "Not set"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">
                  {project.endDate ? format(new Date(project.endDate), "PPP") : "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <div className="flex items-center mt-1">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">
                  {format(new Date(project.createdDateTime), "PPP")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
              <div className="flex items-center mt-1">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">
                  {project.lastUpdatedDateTime 
                    ? format(new Date(project.lastUpdatedDateTime), "PPP") 
                    : "Never"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="py-4">
          <p className="text-muted-foreground text-center">Project activity will be shown here.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectDetailsPanelContent;
