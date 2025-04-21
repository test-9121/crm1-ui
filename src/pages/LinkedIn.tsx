
import React, { useState } from "react";
import LinkedInTable from "@/modules/linkedin/components/LinkedInTable";
import { LinkedInSummaryCards } from "@/modules/linkedin/components/LinkedInSummaryCards";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LinkedInProfile } from "@/modules/linkedin/types";
import { toast } from "@/components/ui/sonner";

export default function LinkedIn() {
  // Replace with actual logic to get data
  const totalLeads = 184;
  const totalConnections = 318;
  const totalMessages = 190;
  
  // Sample LinkedIn profiles data
  const [profiles, setProfiles] = useState<LinkedInProfile[]>([
    {
      id: "1",
      headline: "John Doe",
      accountName: "johndoe",
      company: "Acme Inc.",
      currentPosition: "Software Engineer",
      designation: "Senior Developer",
      location: "San Francisco",
      country: "USA",
      industry: "Technology",
      connections: 500,
      connectionsCount: 500,
      createdDateTime: "2023-05-15T10:30:00Z",
      lastUpdatedDateTime: null,
      email: "john.doe@example.com",
      status: "Active",
      handledBy: {
        id: "u1",
        name: "Admin User",
        email: "admin@example.com",
        role: { id: "r1", name: "Admin" }
      },
      organization: {
        id: "o1",
        name: "Example Org"
      }
    },
    {
      id: "2",
      headline: "Jane Smith",
      accountName: "janesmith",
      company: "Tech Solutions",
      currentPosition: "Product Manager",
      designation: "Product Lead",
      location: "New York",
      country: "USA",
      industry: "SaaS",
      connections: 750,
      connectionsCount: 750,
      createdDateTime: "2023-06-20T14:45:00Z",
      lastUpdatedDateTime: null,
      email: "jane.smith@example.com",
      status: "Active",
      handledBy: {
        id: "u1",
        name: "Admin User",
        email: "admin@example.com",
        role: { id: "r1", name: "Admin" }
      },
      organization: {
        id: "o2",
        name: "Tech Solutions Inc."
      }
    },
  ]);

  // Handlers for LinkedInTable props
  const handleEditProfile = (profile: LinkedInProfile) => {
    toast.info(`Editing profile: ${profile.headline}`);
  };

  const handleDeleteProfile = (profile: LinkedInProfile) => {
    toast.info(`Deleting profile: ${profile.headline}`);
  };

  const handleProfileClick = (profile: LinkedInProfile) => {
    toast.info(`Viewing profile: ${profile.headline}`);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">LinkedIn</h1>
        <Button
          className="bg-gradient-to-r from-blue-500 to-white/80 text-white font-bold shadow hover:from-blue-600 hover:to-blue-100 hover:scale-105 transition-all duration-200"
        >
          <Plus className="mr-2" />
          Create New LinkedIn
        </Button>
      </div>
      
      <LinkedInSummaryCards
        totalLeads={totalLeads}
        totalConnections={totalConnections}
        totalMessages={totalMessages}
      />
      <LinkedInTable 
        profiles={profiles} 
        tableColor="#3b82f6" 
        onEditProfile={handleEditProfile}
        onDeleteProfile={handleDeleteProfile}
        onProfileClick={handleProfileClick}
        isLoading={false}
      />
    </DashboardLayout>
  );
}
