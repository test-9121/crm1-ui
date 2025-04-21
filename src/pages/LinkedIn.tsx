import React from "react";
import LinkedInTable from "@/modules/linkedin/components/LinkedInTable";
import { LinkedInSummaryCards } from "@/modules/linkedin/components/LinkedInSummaryCards";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LinkedIn() {
  // Replace with actual logic to get data
  const totalLeads = 184;
  const totalConnections = 318;
  const totalMessages = 190;

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
      <LinkedInTable />
    </DashboardLayout>
  );
}
