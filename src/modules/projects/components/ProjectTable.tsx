
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
