
import { User } from "@/modules/users/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

interface UserDetailsPanelContentProps {
  user: User;
}

const UserDetailsPanelContent = ({ user }: UserDetailsPanelContentProps) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "InActive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
          ) : (
            <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.email}</p>
          <Badge className={`${getStatusColor(user.status)} mt-1`}>
            {user.status}
          </Badge>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <p className="text-sm text-muted-foreground">Email</p>
            
          </div> */}
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user.phoneNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">{user.address || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium">
              {[user.city, user.state, user.country].filter(Boolean).join(", ") || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ZIP Code</p>
            <p className="font-medium">{user.zipCode || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Company</p>
            <p className="font-medium">{user.company || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{user.role.roleName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Organization</p>
            <p className="font-medium">{user.organization.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="font-medium">
              {user.lastLoginDateTime ? formatDate(user.lastLoginDateTime) : "Never"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email Verified</p>
            <p className="font-medium">{user.emailVerified ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="font-medium">{user.verified ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(user.createdDateTime)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsPanelContent;
