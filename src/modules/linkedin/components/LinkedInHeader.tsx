
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, ChevronUp, ChevronDown, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface LinkedInHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  profilesCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const LinkedInHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  profilesCount,
  onTableUpdate,
  onCollapse,
  onEditingChange,
}: LinkedInHeaderProps) => {
  const [name, setName] = useState(tableName);
  const [color, setColor] = useState(tableColor);

  const handleSave = () => {
    onTableUpdate(name, color);
  };

  const handleCancel = () => {
    setName(tableName);
    setColor(tableColor);
    onEditingChange(false);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center p-0 space-y-0 gap-2">
        <div className="flex-1 flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                className="max-w-xs h-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    style={{
                      backgroundColor: color,
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <span className="sr-only">Pick a color</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={color}
                    onChange={setColor}
                  />
                </PopoverContent>
              </Popover>

              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: tableColor }}
              />
              <h3 className="text-lg font-medium">{tableName}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEditingChange(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {profilesCount} profiles
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onCollapse}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LinkedInHeader;
