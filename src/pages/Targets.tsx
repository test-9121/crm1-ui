
// Update the TargetTable component in the JSX - use onTargetClick instead of onRowClick
<TargetTable 
  targets={filteredTargets}
  tableColor={tableColor}
  onEditTarget={handleEditTarget}
  onDeleteTarget={handleDeleteTarget}
  isLoading={isLoading}
  onTargetClick={handleTargetClick}
  pagination={pagination}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
