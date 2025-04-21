
import DataTable from "@/components/shared/DataTable/DataTable";
import { Project } from "@/modules/projects/types";
import { Badge } from "@/components/ui/badge";

interface ProjectTableProps {
  projects: Project[];
  tableColor: string;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  isLoading: boolean;
  onRowClick: (project: Project) => void;
}

const ProjectTable = ({
  projects,
  tableColor,
  onEditProject,
  onDeleteProject,
  isLoading,
  onRowClick
}: ProjectTableProps) => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (project: Project) => (
        <div
          className="cursor-pointer hover:text-primary transition-colors font-medium"
          onClick={() => onRowClick(project)}
        >
          {project.name}
        </div>
      )
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (project: Project) => <div className="truncate max-w-[400px]">{project.description}</div>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (project: Project) => {
        if (!project.status) return null;
        
        const statusColorMap: Record<string, string> = {
          "Planning": "bg-blue-100 text-blue-800 hover:bg-blue-200",
          "In Progress": "bg-amber-100 text-amber-800 hover:bg-amber-200",
          "Completed": "bg-green-100 text-green-800 hover:bg-green-200",
          "On Hold": "bg-red-100 text-red-800 hover:bg-red-200",
        };
        
        const statusColor = statusColorMap[project.status] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
        
        return (
          <Badge
            className={`${statusColor} font-medium rounded-md whitespace-nowrap`}
            variant="outline"
          >
            {project.status}
          </Badge>
        );
      }
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
      cell: (project: Project) => project.startDate ? 
        new Date(project.startDate).toLocaleDateString() : 'N/A'
    },
    {
      header: "End Date",
      accessorKey: "endDate",
      cell: (project: Project) => project.endDate ? 
        new Date(project.endDate).toLocaleDateString() : 'N/A'
    }
  ];

  return (
    <DataTable
      data={projects}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditProject}
      onDelete={(project: Project) => onDeleteProject(project.id)}
    />
  );
};

export default ProjectTable;
