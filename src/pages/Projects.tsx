// import { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { toast } from "@/components/ui/sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// // Project-related imports
// import { useProjects } from "@/modules/projects/hooks/useProjects";
// import { Project } from "@/modules/projects/types";
// import ProjectForm from "@/modules/projects/components/ProjectForm";
// import ProjectHeader from "@/modules/projects/components/ProjectHeader";
// import ProjectToolbar from "@/modules/projects/components/ProjectToolbar";
// import ProjectTable from "@/modules/projects/components/ProjectTable";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// import ProjectDetailsPanelContent from "@/modules/projects/components/ProjectDetailsPanelContent";

// const Projects = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [tableName, setTableName] = useState("Company Projects");
//   const [tableColor, setTableColor] = useState("#F97316");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showProjectForm, setShowProjectForm] = useState(false);
//   const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
//   const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

//   const {
//     projects = [],
//     isLoading,
//     isEmpty,
//     getProjectById,
//     deleteProject,
//     pagination,
//     handlePageChange,
//     handlePageSizeChange
//   } = useProjects();

//   // Effect to handle URL-based project editing
//   useEffect(() => {
//     if (id) {
//       const currentProject = getProjectById(id);
//       if (currentProject) {
//         setProjectToEdit(currentProject);
//         setShowProjectForm(true);
//       } else {
//         toast.error("Project not found");
//         navigate("/projects", { replace: true });
//       }
//     } else {
//       // Only reset if we're not coming from the edit route
//       if (!location.pathname.includes("/edit/")) {
//         setProjectToEdit(null);
//       }
//     }
//   }, [id, getProjectById, navigate, location.pathname]);

//   const handleTableUpdate = (name: string, color: string) => {
//     setTableName(name);
//     setTableColor(color);
//     setIsEditing(false);
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleSearchChange = (term: string) => {
//     setSearchTerm(term);
//   };

//   const handleEditProject = (project: Project) => {
//     setProjectToEdit(project);
//     setShowProjectForm(true);
    
//     // Update URL to reflect editing state without creating a browser history entry
//     navigate(`/projects/edit/${project.id}`, { replace: false });
//   };

//   const handleDeleteProject = (projectId: string) => {
//     setProjectToDelete(projectId);
//   };

//   const confirmDelete = () => {
//     if (projectToDelete) {
//       deleteProject.mutate(projectToDelete);
//       setProjectToDelete(null);
//     }
//   };

//   const handleFormClose = () => {
//     setShowProjectForm(false);
    
//     // Navigate back to projects page with replace to avoid history stacking
//     navigate("/projects", { replace: true });
    
//     // Reset the edit state after a short delay to prevent UI issues
//     setTimeout(() => {
//       setProjectToEdit(null);
//     }, 100);
//   };

//   const handleRowClick = (project: Project) => {
//     setSelectedProject(project);
//     setIsDetailsPanelOpen(true);
//   };

//   // Filter projects based on search term
//   const filteredProjects = Array.isArray(projects) 
//     ? projects.filter(project => 
//         project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (project.status && project.status.toLowerCase().includes(searchTerm.toLowerCase()))
//       )
//     : [];

//   return (
//     <>
//       <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
//         <ProjectToolbar 
//           onSearchChange={handleSearchChange}
//           onNewProject={() => {
//             setProjectToEdit(null);
//             setShowProjectForm(true);
//           }}
//         />
        
//         <ProjectHeader 
//           tableName={tableName}
//           tableColor={tableColor}
//           isEditing={isEditing}
//           isCollapsed={isCollapsed}
//           projectsCount={pagination.totalElements}
//           onTableUpdate={handleTableUpdate}
//           onCollapse={toggleCollapse}
//           onEditingChange={setIsEditing}
//         />

//         {!isCollapsed && (
//           <div className="w-full overflow-x-auto">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-32">
//                 <p className="text-gray-500">Loading projects...</p>
//               </div>
//             ) : isEmpty ? (
//               <Alert>
//                 <AlertDescription className="text-center py-8">
//                   No projects available. Click the "New Project" button to add one.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <ProjectTable 
//                 projects={filteredProjects}
//                 tableColor={tableColor}
//                 onEditProject={handleEditProject}
//                 onDeleteProject={handleDeleteProject}
//                 isLoading={isLoading}
//                 onRowClick={handleRowClick}
//                 pagination={pagination}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//               />
//             )}
//           </div>
//         )}

//         {/* Side panel for displaying project details */}
//         <DetailsSidePanel
//           data={selectedProject}
//           open={isDetailsPanelOpen}
//           onClose={() => setIsDetailsPanelOpen(false)}
//           renderContent={(project) => <ProjectDetailsPanelContent project={project} />}
//         />

//         {/* Project Form */}
//         {showProjectForm && (
//           <ProjectForm
//             open={showProjectForm}
//             onOpenChange={handleFormClose}
//             initialData={projectToEdit}
//           />
//         )}

//         {/* Delete Confirmation */}
//         <AlertDialog open={projectToDelete !== null} onOpenChange={() => setProjectToDelete(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the project.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction 
//                 onClick={confirmDelete}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </>
//   );
// };

// export default Projects;



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

// Project-related imports
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { Project } from "@/modules/projects/types";
import ProjectForm from "@/modules/projects/components/ProjectForm";
import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import ProjectToolbar from "@/modules/projects/components/ProjectToolbar";
import ProjectTable from "@/modules/projects/components/ProjectTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import ProjectDetailsPanelContent from "@/modules/projects/components/ProjectDetailsPanelContent";

const Projects = () => {
  // Removed useParams, useLocation and useEffect as we don't need them anymore
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Company Projects");
  const [tableColor, setTableColor] = useState("#F97316");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const {
    projects = [],
    isLoading,
    isEmpty,
    deleteProject,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useProjects();

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
    // Direct edit without navigation or API call
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

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsPanelOpen(true);
  };

  // Filter projects based on search term
  const filteredProjects = Array.isArray(projects) 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.status && project.status.toLowerCase().includes(searchTerm.toLowerCase()))
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
          projectsCount={pagination.totalElements}
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
                onRowClick={handleRowClick}
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
