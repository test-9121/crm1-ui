
import React from "react";
import { format } from "date-fns";
import { Role } from "@/modules/roles/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

interface RoleDetailsPanelContentProps {
  role: Role;
}

const RoleDetailsPanelContent = ({ role }: RoleDetailsPanelContentProps) => {
  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "ROLE_SUPER_ADMIN":
        return "bg-red-100 text-red-800";
      case "ROLE_ADMIN":
        return "bg-purple-100 text-purple-800";
      case "ROLE_USER":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{role.roleName}</h2>
        <p className="text-gray-500 mt-1">{role.roleDescription}</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Role Info</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Permission Level</p>
            <Badge className={`${getPermissionColor(role.rolePermission)} font-medium mt-1`} variant="outline">
              {role.rolePermission}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">
                {format(new Date(role.createdDateTime), "PPP")}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {role.lastUpdatedDateTime 
                  ? format(new Date(role.lastUpdatedDateTime), "PPP") 
                  : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Organization details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{role.organization.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Domain</p>
              <p className="font-medium">{role.organization.domain}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleDetailsPanelContent;
