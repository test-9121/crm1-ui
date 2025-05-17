
// Update the ProjectTable component in the JSX - use onProjectClick instead of onRowClick
<ProjectTable 
  projects={filteredProjects}
  tableColor={tableColor}
  onEditProject={handleEditProject}
  onDeleteProject={handleDeleteProject}
  isLoading={isLoading}
  onProjectClick={showProjectDetails}
  pagination={pagination}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
