
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isDense?: boolean;
  onDenseChange?: (dense: boolean) => void;
  // Add these for backward compatibility
  rowsPerPage?: number;
  onRowsPerPageChange?: (size: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems,
  currentPage,
  totalPages,
  pageSize,
  rowsPerPage, // Add backward compatibility prop
  onPageChange,
  onPageSizeChange,
  onRowsPerPageChange, // Add backward compatibility prop
  isDense,
  onDenseChange,
}) => {
  const effectivePageSize = pageSize || rowsPerPage || 10;
  const startItem = totalItems > 0 ? (currentPage - 1) * effectivePageSize + 1 : 0;
  const endItem = Math.min(currentPage * effectivePageSize, totalItems);

  const handleRowsPerPageChange = (value: string) => {
    const newPageSize = Number(value);
    if (onPageSizeChange) onPageSizeChange(newPageSize);
    if (onRowsPerPageChange) onRowsPerPageChange(newPageSize);
    onPageChange(1); // Reset to first page
  };

  return (
    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
      {onDenseChange && (
        <div className="flex items-center space-x-2">
          <Switch
            id="dense-mode"
            checked={isDense}
            onCheckedChange={onDenseChange}
          />
          <Label htmlFor="dense-mode">Dense</Label>
        </div>
      )}

      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <Select
            value={String(effectivePageSize)}
            onValueChange={handleRowsPerPageChange}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder={String(effectivePageSize)} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50, 100].map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span>
          {startItem}–{endItem} of {totalItems}
        </span>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
