
import { LinkedInProfile } from "../types";
import DataTable, { Column } from "@/components/shared/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";

interface LinkedInTableProps {
  profiles: LinkedInProfile[];
  tableColor: string;
  onEditProfile: (profile: LinkedInProfile) => void;
  onDeleteProfile: (profile: LinkedInProfile) => void;
  onProfileClick: (profile: LinkedInProfile) => void;
  isLoading?: boolean;
}

const LinkedInTable = ({
  profiles,
  tableColor,
  onEditProfile,
  onDeleteProfile,
  onProfileClick,
  isLoading = false
}: LinkedInTableProps) => {

  // Define columns for the LinkedIn profiles table
  const columns: Column<LinkedInProfile>[] = [
    {
      header: "Name",
      accessorKey: "headline",
      cell: (profile) => (
        <div 
          className="font-medium cursor-pointer hover:underline"
          onClick={() => onProfileClick(profile)}
        >
          {profile.headline || profile.accountName}
        </div>
      )
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: (profile) => (
        <span>{profile.company || "Not specified"}</span>
      )
    },
    {
      header: "Position",
      accessorKey: "currentPosition",
      cell: (profile) => (
        <span>{profile.currentPosition || profile.designation}</span>
      )
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (profile) => (
        <span>{profile.location || profile.country}</span>
      )
    },
    {
      header: "Industry",
      accessorKey: "industry",
      cell: (profile) => (
        <Badge variant="outline" className="font-normal">
          {profile.industry || "Not specified"}
        </Badge>
      )
    },
    {
      header: "Connections",
      accessorKey: "connections",
      cell: (profile) => (
        <span>{(profile.connections || profile.connectionsCount).toLocaleString()}</span>
      )
    }
  ];

  return (
    <DataTable
      data={profiles}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditProfile}
      onDelete={onDeleteProfile}
    />
  );
};

export default LinkedInTable;
