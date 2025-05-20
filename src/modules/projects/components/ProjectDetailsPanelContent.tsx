
import React from "react";
import { format } from "date-fns";
import { Project } from "@/modules/projects/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectDetailsPanelContentProps {
  project: Project;
}

const ProjectDetailsPanelContent = ({ project }: ProjectDetailsPanelContentProps) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      case "On Hold":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
        <Badge className={cn("px-2 py-1", getStatusColor(project.status))}>
          {project.status || "Planning"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1">{project.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Organization</h3>
          <p className="mt-1">{project.organization.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
            <p className="mt-1">
              {project.startDate ? format(new Date(project.startDate), "PPP") : "Not set"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">End Date</h3>
            <p className="mt-1">
              {project.endDate ? format(new Date(project.endDate), "PPP") : "Not set"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created</h3>
            <p className="mt-1">
              {format(new Date(project.createdDateTime), "PPP")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="mt-1">
              {project.lastUpdatedDateTime 
                ? format(new Date(project.lastUpdatedDateTime), "PPP") 
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPanelContent;
