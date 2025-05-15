
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, CalendarIcon, CheckCircle, CheckSquare, Clock, FileText, Mail, MessageSquare, Target, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ActivityFeed } from "@/modules/common/ActivityFeed";
import { ChartCard } from "@/modules/common/ChartCard";
import { StatCard } from "@/modules/common/StatCard";
import { useState } from "react";
import { useTargets } from "@/modules/targets/hooks/useTargets";
import { useEvents } from "@/modules/events/hooks/useEvents";






const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const {targets} = useTargets();

  const {allEvents} = useEvents();

  console.log("All Events", allEvents.data);

  const [timeRange, setTimeRange] = useState("weekly");

  const leadsData = targets.map((target) => ({
    name: target.accountName,
    data: [
      {
        name: target.accountName,
        data: [
          target.connectionsCount || 0, // Default to 0 if undefined
          target.noOfLeadsIdentified || 0, // Default to 0 if undefined
          target.connectionsSent || 0, // Default to 0 if undefined
          target.messagesSent || 0, // Default to 0 if undefined
          target.followUps || 0, // Default to 0 if undefined
          target.meetingsScheduled || 0, // Default to 0 if undefined
          target.inMailCount || 0, // Default to 0 if undefined
          target.postings || 0, // Default to 0 if undefined
        ],
      },
    ],
  }));

  const summaryCardsData = targets.reduce(
    (acc, target) => {
      // Accumulate the various metrics
      acc.noOfLeadsIdentified += target.noOfLeadsIdentified || 0;
      acc.connectionsCount += target.connectionsCount || 0;
      acc.messagesSent += target.messagesSent || 0;
      acc.followUps += target.followUps || 0;
      acc.meetingsScheduled += target.meetingsScheduled || 0;
      acc.inMailCount += target.inMailCount || 0;
      acc.postings += target.postings || 0;
      acc.connectionsSent += target.connectionsSent || 0;

      // Track counts for active, inactive, and on hold targets
      if (target.status === 'Active') {
        acc.activeTargetsCount += 1;
      } else if (target.status === 'InActive') {
        acc.inactiveTargetsCount += 1;
      } else if (target.status === 'OnHold') {
        acc.onHoldTargetsCount += 1;
      }
      acc.totalTargetCount = acc.activeTargetsCount + acc.inactiveTargetsCount + acc.onHoldTargetsCount;
      return acc;
    },
    {
      noOfLeadsIdentified: 0,
      connectionsCount: 0,
      messagesSent: 0,
      followUps: 0,
      meetingsScheduled: 0,
      inMailCount: 0,
      postings: 0,
      activeTargetsCount: 0,  // Initial count for active targets
      inactiveTargetsCount: 0, // Initial count for inactive targets
      onHoldTargetsCount: 0,   // Initial count for on hold targets
      connectionsSent: 0,
      totalTargetCount: 0,
    } // initial value
  );

  const getRoleBadge = () => {
    switch (user.role.rolePermission) {
      case 'ROLE_SUPER_ADMIN':
        return <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-200">Super Admin</Badge>;
      case 'ROLE_ADMIN':
        return <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-200">Admin</Badge>;
      case 'ROLE_USER':
        return <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-200">User</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                Welcome back, {user.firstName || "User"}
                {getRoleBadge()}
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your CRM performance and key metrics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Today :</p>
              <div className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            {/* <Card className="w-full md:w-auto">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Current Date</p>
                  <p className="text-2xl font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </section>

        {/* Stats Overview */}
        <div className="p-2 space-y-8 animate-fade-in">
          {/* <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-1">Track your performance metrics and activities</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10">
                Today
              </Badge>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="default" className="ml-2 bg-primary hover:bg-primary/90">
                Export
              </Button>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="No. of Leads Identified"
              value={summaryCardsData.noOfLeadsIdentified}
              icon={<Users size={20} />}
              trend={{ value: 12, isPositive: true }}
              className="bg-gradient-to-br from-card to-accent/5 hover:shadow-md transition-all duration-300"
            />
            <StatCard
              title="Connections Sent"
              value={summaryCardsData.connectionsSent}
              icon={<MessageSquare size={20} />}
              trend={{ value: 8, isPositive: true }}
              className="bg-gradient-to-br from-card to-primary/5 hover:shadow-md transition-all duration-300"
            />
            <StatCard
              title="Messages Sent"
              value={summaryCardsData.messagesSent}
              icon={<Mail size={20} />}
              trend={{ value: 5, isPositive: true }}
              className="bg-gradient-to-br from-card to-secondary/10 hover:shadow-md transition-all duration-300"
            />
            <StatCard
              title="Follow Ups"
              value={summaryCardsData.followUps}
              icon={<CheckSquare size={20} />}
              trend={{ value: 3, isPositive: false }}
              className="bg-gradient-to-br from-card to-secondary/5 hover:shadow-md transition-all duration-300"
            />
            <StatCard
              title="Meetings Scheduled"
              value={summaryCardsData.meetingsScheduled}
              icon={<Calendar size={20} />}
              trend={{ value: 10, isPositive: true }}
              className="bg-gradient-to-br from-card to-accent/5 hover:shadow-md transition-all duration-300"
            />
            <StatCard
              title="InMail Count"
              value={summaryCardsData.inMailCount}
              icon={<FileText size={20} />}
              trend={{ value: 2, isPositive: true }}
              className="bg-gradient-to-br from-card to-primary/5 hover:shadow-md transition-all duration-300"
            />
          </div>

          <ChartCard
            title="Client Data Insights"
            description="Visual representation of client data over time."
            data={leadsData}
            dataKey="data"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <ChartCard
              title="No Of Leads Identified"
              data={leadsData}
              dataKey="value"
              description="Daily lead identification analytics"
            />
            <ChartCard
              title="Connections Sent"
              data={connectionsData}
              dataKey="value"
              description="Connection requests analytics"
            />
            <ChartCard
              title="Messages Sent"
              data={messagesData}
              dataKey="value"
              type="line"
              description="Message engagement analytics"
            /> */}


            {/* <ChartCard
              title="Follow Ups"
              data={followUpsData}
              dataKey="value"
              type="line"
              description="Follow-up engagement analytics"
            /> */}


          </div>
          <ActivityFeed activities={allEvents.data} />

          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard
                  title="Meetings Scheduled"
                  data={meetingsData}
                  dataKey="value"
                  description="Meeting scheduling analytics"
                />
                <ChartCard
                  title="In Mail Count"
                  data={inMailData}
                  dataKey="value"
                  description="InMail engagement analytics"
                />
              </div>
            </div>
           
          </div> */}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
