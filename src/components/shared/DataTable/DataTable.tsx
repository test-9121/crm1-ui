
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Column<T> = {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
};

type DataTableProps<TData extends { id: string }> = {
  data: TData[];
  columns: Column<TData>[];
  tableColor: string;
  isLoading?: boolean;
  onEdit?: (item: TData) => void;
  onDelete?: (item: TData) => void;
  actions?: boolean;
};

function DataTable<TData extends { id: string }>({
  data,
  columns,
  tableColor,
  isLoading = false,
  onEdit,
  onDelete,
  actions = true,
}: DataTableProps<TData>) {
  if (isLoading) {
    return <LoadingTable columnCount={columns.length} />;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
        <CardContent className="p-6 flex justify-center items-center">
          <p className="text-muted-foreground">No data found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))}
                {actions && <TableHead className="w-[80px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      {column.cell
                        ? column.cell(item)
                        : getNestedValue(item, String(column.accessorKey))}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

const LoadingTable = ({ columnCount }: { columnCount: number }) => (
  <Card className="relative">
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnCount }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// Helper function to get nested object values using dot notation
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((current, key) => current?.[key], obj) ?? "-";
};

export default DataTable;
