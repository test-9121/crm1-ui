
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
  isDense?: boolean;
  onDenseChange?: (dense: boolean) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  isDense,
  onDenseChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = totalItems > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const handleRowsPerPageChange = (value: string) => {
    onRowsPerPageChange(Number(value));
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
            value={String(rowsPerPage)}
            onValueChange={handleRowsPerPageChange}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder={String(rowsPerPage)} />
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
