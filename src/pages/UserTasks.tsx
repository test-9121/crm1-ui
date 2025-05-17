
// Update the UserTaskTable component in the JSX - use onTaskClick instead of onRowClick
<UserTaskTable 
  tasks={filteredTasks}
  tableColor={tableColor}
  onEditTask={handleEditTask}
  onDeleteTask={handleDeleteTask}
  isLoading={isLoading}
  onTaskClick={handleOpenTaskDetails}
  pagination={pagination}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
