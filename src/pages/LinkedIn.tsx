
// Update the LinkedInTable component in the JSX - use onProfileClick instead of onRowClick
<LinkedInTable 
  profiles={filteredProfiles}
  tableColor={tableColor}
  onEditProfile={handleEditProfile}
  onDeleteProfile={handleDeleteProfile}
  isLoading={isLoading}
  onProfileClick={handleOpenProfileDetails}
  pagination={pagination}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
