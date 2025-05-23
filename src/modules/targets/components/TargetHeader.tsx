
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Check, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { Card, CardContent } from "@/components/ui/card";

interface TargetHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  targetsCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const TargetHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  targetsCount,
  onTableUpdate,
  onCollapse,
  onEditingChange
}: TargetHeaderProps) => {
  const [editName, setEditName] = useState(tableName);
  const [editColor, setEditColor] = useState(tableColor);

  const handleSave = () => {
    onTableUpdate(editName, editColor);
  };

  const handleCancel = () => {
    setEditName(tableName);
    setEditColor(tableColor);
    onEditingChange(false);
  };

  const headerContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex gap-3 items-center">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-[200px]"
              />
              <div className="relative">
                <div
                  className="w-6 h-6 rounded cursor-pointer border"
                  style={{ backgroundColor: editColor }}
                />
                <div className="absolute top-8 z-10">
                  <HexColorPicker color={editColor} onChange={setEditColor} />
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Check size={18} />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X size={18} />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onCollapse}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <h3 className="text-lg font-medium" style={{ color: tableColor }}>
                  {tableName}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => onEditingChange(true)}
                >
                  <Edit size={14} />
                </Button>
              </div>
              {isCollapsed && (
                <div className="text-md text-gray-500">
                  {targetsCount} {targetsCount === 1 ? 'target' : 'targets'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {isCollapsed ? (
        <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
          <CardContent className="p-4">
            {headerContent()}
          </CardContent>
        </Card>
      ) : (
        <div className="pl-2">
          {headerContent()}
        </div>
      )}
    </div>
  );
};

export default TargetHeader;
