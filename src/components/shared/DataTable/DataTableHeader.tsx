
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Color options available for the table header
const colorOptions = [
  '#2F9E44', '#40C057', '#94D82D', '#A8945C', '#FCC419', 
  '#845EF7', '#9775FA', '#228BE6', '#15AABF', '#E03131', 
  '#F86B6B', '#FF6B8B', '#FF8EC7', '#FF922B', '#FFA94D', 
  '#6B4423', '#CED4DA', '#495057'
];

interface DataTableHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  itemCount: number;
  itemLabel?: string;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const DataTableHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  itemCount,
  itemLabel = "items",
  onTableUpdate,
  onCollapse,
  onEditingChange
}: DataTableHeaderProps) => {
  const [nameInput, setNameInput] = useState(tableName);
  const [colorInput, setColorInput] = useState(tableColor);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTableUpdate(nameInput, colorInput);
    }
  };

  const handleColorSelect = (color: string) => {
    setColorInput(color);
    onTableUpdate(nameInput, color);
  };

  const displayText = isCollapsed ? `${tableName} (${itemCount})` : tableName;

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onCollapse} 
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" style={{ color: tableColor }} />
        ) : (
          <ChevronDown className="h-4 w-4" style={{ color: tableColor }} />
        )}
      </button>
      
      {isEditing ? (
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => onTableUpdate(nameInput, colorInput)}
              className="h-8 text-lg font-medium pl-9"
              autoFocus
            />
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="absolute left-2 hover:opacity-80 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Circle 
                    fill={colorInput} 
                    color={colorInput} 
                    size={20}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[232px] p-3">
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ) : (
        <h2
          className="text-lg font-medium cursor-pointer"
          style={{ color: tableColor }}
          onClick={() => onEditingChange(true)}
        >
          {displayText}
          <span className="text-sm text-muted-foreground ml-2">
            ({itemCount} {itemCount === 1 ? itemLabel : `${itemLabel}s`})
          </span>
        </h2>
      )}
    </div>
  );
};

export default DataTableHeader;
