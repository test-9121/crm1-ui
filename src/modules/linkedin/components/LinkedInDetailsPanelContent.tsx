
import { LinkedInProfile } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, MapPin, Briefcase, Users, Calendar } from "lucide-react";

interface LinkedInDetailsPanelContentProps {
  profile: LinkedInProfile;
}

const LinkedInDetailsPanelContent = ({ profile }: LinkedInDetailsPanelContentProps) => {
  const openLinkedInProfile = () => {
    const url = profile.profileUrl || `https://linkedin.com/in/${profile.accountName}`;
    window.open(url, '_blank');
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="flex-1">Profile</TabsTrigger>
        <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{profile.headline || profile.accountName}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={openLinkedInProfile} className="gap-1">
                <ExternalLink className="h-4 w-4" />
                View on LinkedIn
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Current Position</h3>
              <div className="flex items-center mt-1">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">{profile.currentPosition || profile.designation || "Not specified"}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
              <div className="flex items-center mt-1">
                <svg className="h-4 w-4 mr-2 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-medium">{profile.company || "Not specified"}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">{profile.location || profile.country || "Not specified"}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
              <Badge variant="outline" className="font-normal mt-1">
                {profile.industry || "Not specified"}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Connections</h3>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">{(profile.connections || profile.connectionsCount || 0).toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Profile URL</h3>
              <p className="text-sm text-blue-600 underline cursor-pointer break-all mt-1" onClick={openLinkedInProfile}>
                {profile.profileUrl || `https://linkedin.com/in/${profile.accountName}`}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">
                  {new Date(profile.createdAt || profile.createdDateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">
                  {new Date(profile.updatedAt || profile.lastUpdatedDateTime || profile.createdDateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="activity">
        <div className="py-4">
          <p className="text-muted-foreground text-center">LinkedIn activity will be shown here.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default LinkedInDetailsPanelContent;
