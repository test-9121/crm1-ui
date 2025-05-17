
import React from 'react';

/**
 * This is a utility to handle row clicks in tables where the component doesn't 
 * have an onRowClick prop but needs the functionality.
 */
export const handleRowClick = <T,>(
  e: React.MouseEvent<HTMLTableRowElement>,
  item: T,
  callback: (item: T) => void
) => {
  // Don't trigger row click if user clicked on a button or other interactive element
  const isInteractiveElement = 
    (e.target as HTMLElement).closest('button') || 
    (e.target as HTMLElement).closest('a') || 
    (e.target as HTMLElement).closest('[role="button"]');
  
  if (!isInteractiveElement) {
    e.preventDefault();
    e.stopPropagation();
    callback(item);
  }
};
