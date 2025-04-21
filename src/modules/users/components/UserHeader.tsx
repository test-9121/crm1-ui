
import { useState } from "react";
import { ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface UserHeaderProps {
  tableName: string;
  tableColor: string;
  isEditing: boolean;
  isCollapsed: boolean;
  usersCount: number;
  onTableUpdate: (name: string, color: string) => void;
  onCollapse: () => void;
  onEditingChange: (value: boolean) => void;
}

const UserHeader = ({
  tableName,
  tableColor,
  isEditing,
  isCollapsed,
  usersCount,
  onTableUpdate,
  onCollapse,
  onEditingChange,
}: UserHeaderProps) => {
  const [name, setName] = useState(tableName);
  const [color, setColor] = useState(tableColor);

  const handleEdit = () => {
    onEditingChange(true);
  };

  const handleSave = () => {
    onTableUpdate(name, color);
  };

  return (
    <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {isEditing ? (
              <>
                <Input
                  className="max-w-[200px]"
                  placeholder="Table name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="color"
                  className="w-10 h-10 p-1 cursor-pointer"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Button size="sm" onClick={handleSave}>Save</Button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-medium">{tableName}</h2>
                <div className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {usersCount} {usersCount === 1 ? "User" : "Users"}
                </div>
                <Button size="sm" variant="ghost" onClick={handleEdit}>
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            className="rounded-full"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserHeader;
