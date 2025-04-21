
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";

interface RoleHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  rolesCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (editing: boolean) => void;
}

const RoleHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  rolesCount,
  onTableUpdate,
  onCollapse,
  onEditingChange
}: RoleHeaderProps) => {
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

  return (
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
                <div 
                  className="w-3 h-6 mr-2 rounded-sm"
                  style={{ backgroundColor: tableColor }}
                />
                <h3 className="text-lg font-medium">{tableName}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => onEditingChange(true)}
                >
                  <Edit size={14} />
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                {rolesCount} {rolesCount === 1 ? 'role' : 'roles'}
              </div>
            </>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCollapse}
          className="h-8 w-8 p-0 rounded-full"
        >
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default RoleHeader;
