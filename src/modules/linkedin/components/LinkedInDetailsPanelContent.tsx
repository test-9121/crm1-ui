
import { LinkedInProfile } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

interface LinkedInDetailsPanelContentProps {
  profile: LinkedInProfile;
}

const LinkedInDetailsPanelContent = ({ profile }: LinkedInDetailsPanelContentProps) => {
  const openLinkedInProfile = () => {
    const url = profile.profileUrl || `https://linkedin.com/in/${profile.accountName}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{profile.headline || profile.accountName}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={openLinkedInProfile}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View on LinkedIn
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Current Position</h3>
          <p className="text-base">{profile.currentPosition || profile.designation}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Company</h3>
          <p className="text-base">{profile.company || "Not specified"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Location</h3>
          <p className="text-base">{profile.location || profile.country}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Industry</h3>
          <Badge variant="outline" className="font-normal">
            {profile.industry || "Not specified"}
          </Badge>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Connections</h3>
          <p className="text-base">{(profile.connections || profile.connectionsCount).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">User ID</h3>
          <p className="text-base">{profile.userId || profile.handledBy.id}</p>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-1">URL</h3>
        <p className="text-sm text-blue-500 underline cursor-pointer break-all" onClick={openLinkedInProfile}>
          {profile.profileUrl || `https://linkedin.com/in/${profile.accountName}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Created</h3>
          <p className="text-sm">
            {new Date(profile.createdAt || profile.createdDateTime).toLocaleDateString()}, 
            {new Date(profile.createdAt || profile.createdDateTime).toLocaleTimeString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Last Updated</h3>
          <p className="text-sm">
            {new Date(profile.updatedAt || profile.lastUpdatedDateTime || profile.createdDateTime).toLocaleDateString()}, 
            {new Date(profile.updatedAt || profile.lastUpdatedDateTime || profile.createdDateTime).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkedInDetailsPanelContent;
