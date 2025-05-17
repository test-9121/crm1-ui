
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProjectTable from "@/modules/projects/components/ProjectTable";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { Project } from "@/modules/projects/types";
import ProjectForm from "@/modules/projects/components/ProjectForm";
import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import ProjectToolbar from "@/modules/projects/components/ProjectToolbar";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import ProjectDetailsPanelContent from "@/modules/projects/components/ProjectDetailsPanelContent";

const Projects = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Projects");
  const [tableColor, setTableColor] = useState("#63bbdf");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Fetch projects
  const {
    projects = [],
    isLoading,
    isEmpty,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    deleteProject
  } = useProjects();

  // Handler functions
  const handleTableUpdate = (name: string, color: string) => {
    setTableName(name);
    setTableColor(color);
    setIsEditing(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject.mutate(projectToDelete);
      setProjectToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowProjectForm(false);
    setProjectToEdit(null);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsPanelOpen(true);
  };

  // Filter projects based on search term
  const filteredProjects = Array.isArray(projects) 
    ? projects.filter(project => 
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <ProjectToolbar 
          onSearchChange={handleSearchChange}
          onNewProject={() => {
            setProjectToEdit(null);
            setShowProjectForm(true);
          }}
        />
        
        <ProjectHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          projectsCount={filteredProjects.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading projects...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No projects available. Click the "New Project" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <ProjectTable 
                projects={filteredProjects}
                tableColor={tableColor}
                onEditProject={handleEditProject}
                onDeleteProject={handleDeleteProject}
                isLoading={isLoading}
                onProjectClick={handleProjectClick}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying project details */}
        <DetailsSidePanel
          data={selectedProject}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          renderContent={(project) => <ProjectDetailsPanelContent project={project} />}
        />

        {/* Project Form */}
        {showProjectForm && (
          <ProjectForm
            open={showProjectForm}
            onOpenChange={handleFormClose}
            initialData={projectToEdit}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={projectToDelete !== null} onOpenChange={() => setProjectToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Projects;
