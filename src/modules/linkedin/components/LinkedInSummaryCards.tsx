
import { Card, CardContent } from "@/components/ui/card";
import { User, Link as LinkIcon, MessageSquare } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
}

const StatCard = ({ icon, label, value, accent }: StatCardProps) => (
  <Card className="flex flex-row items-center gap-4 p-4 bg-white/95 shadow-lg border border-gray-200 rounded-xl w-full max-w-xs min-w-[230px]">
    <div className={`rounded-full h-12 w-12 flex items-center justify-center ${accent}`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-muted-foreground text-base">{label}</span>
      <span className="font-bold text-2xl text-neutral-900">{value}</span>
    </div>
  </Card>
);

export function LinkedInSummaryCards({
  totalLeads = 0,
  totalConnections = 0,
  totalMessages = 0,
}: {
  totalLeads?: number;
  totalConnections?: number;
  totalMessages?: number;
}) {
  return (
    <div className="flex flex-wrap gap-6 mb-6">
      <StatCard
        icon={<User className="text-blue-700" size={28} />}
        label="LinkedIn Leads"
        value={totalLeads}
        accent="bg-blue-100"
      />
      <StatCard
        icon={<LinkIcon className="text-purple-700" size={28} />}
        label="Connections"
        value={totalConnections}
        accent="bg-purple-100"
      />
      <StatCard
        icon={<MessageSquare className="text-yellow-700" size={28} />}
        label="Messages"
        value={totalMessages}
        accent="bg-yellow-100"
      />
    </div>
  );
}
