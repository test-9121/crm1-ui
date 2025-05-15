
// import { useState } from "react";
// import { 
//   Bar, 
//   BarChart, 
//   CartesianGrid, 
//   Line,
//   LineChart,
//   ResponsiveContainer, 
//   Tooltip, 
//   XAxis, 
//   YAxis,
//   Area,
//   AreaChart
// } from "recharts";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { BarChart2, LineChart as LineChartIcon, TrendingUp } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ChartCardProps {
//   title: string;
//   description?: string;
//   data: any[];
//   type?: "bar" | "line" | "area";
//   dataKey: string;
//   height?: number;
// }

// export function ChartCard({
//   title,
//   description,
//   data,
//   type = "bar",
//   dataKey,
//   height = 300,
// }: ChartCardProps) {
//   const [timeRange, setTimeRange] = useState("weekly");
//   const [chartType, setChartType] = useState(type);
  
//   const renderChart = () => {
//     if (chartType === "bar") {
//       return (
//         <ResponsiveContainer width="100%" height={height}>
//           <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
//             <XAxis 
//               dataKey="name" 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//               stroke="hsl(var(--muted-foreground))"
//             />
//             <YAxis 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//               stroke="hsl(var(--muted-foreground))"
//             />
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: "hsl(var(--background))", 
//                 borderColor: "hsl(var(--border))",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
//               }} 
//             />
//             <Bar 
//               dataKey={dataKey} 
//               fill="url(#colorBar)" 
//               radius={[4, 4, 0, 0]}
//               animationDuration={1500}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       );
//     }
    
//     if (chartType === "area") {
//       return (
//         <ResponsiveContainer width="100%" height={height}>
//           <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
//                 <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
//             <XAxis 
//               dataKey="name" 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//               stroke="hsl(var(--muted-foreground))"
//             />
//             <YAxis 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//               stroke="hsl(var(--muted-foreground))"
//             />
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: "hsl(var(--background))", 
//                 borderColor: "hsl(var(--border))",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
//               }} 
//             />
//             <Area 
//               type="monotone" 
//               dataKey={dataKey} 
//               stroke="hsl(var(--primary))" 
//               fillOpacity={1}
//               fill="url(#colorArea)"
//               strokeWidth={2}
//               animationDuration={1500}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       );
//     }
    
//     return (
//       <ResponsiveContainer width="100%" height={height}>
//         <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
//           <XAxis 
//             dataKey="name" 
//             axisLine={false}
//             tickLine={false}
//             tick={{ fontSize: 12 }}
//             stroke="hsl(var(--muted-foreground))"
//           />
//           <YAxis 
//             axisLine={false}
//             tickLine={false}
//             tick={{ fontSize: 12 }}
//             stroke="hsl(var(--muted-foreground))"
//           />
//           <Tooltip 
//             contentStyle={{ 
//               backgroundColor: "hsl(var(--background))", 
//               borderColor: "hsl(var(--border))",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
//             }} 
//           />
//           <Line 
//             type="monotone" 
//             dataKey={dataKey} 
//             stroke="hsl(var(--primary))" 
//             strokeWidth={2}
//             dot={{ strokeWidth: 0, fill: "hsl(var(--primary))", r: 3 }}
//             activeDot={{ r: 6, strokeWidth: 0 }}
//             animationDuration={1500}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   };

//   return (
//     <Card className="overflow-hidden border-border/40 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/90">
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
//             {description && <CardDescription>{description}</CardDescription>}
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-8 w-8 rounded-r-none border-r-0", 
//                   chartType === "bar" ? "bg-muted text-primary" : "text-muted-foreground"
//                 )}
//                 onClick={() => setChartType("bar")}
//               >
//                 <BarChart2 className="h-4 w-4" />
//                 <span className="sr-only">Bar Chart</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-8 w-8 rounded-none border-x-0", 
//                   chartType === "line" ? "bg-muted text-primary" : "text-muted-foreground"
//                 )}
//                 onClick={() => setChartType("line")}
//               >
//                 <LineChartIcon className="h-4 w-4" />
//                 <span className="sr-only">Line Chart</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={cn(
//                   "h-8 w-8 rounded-l-none border-l-0", 
//                   chartType === "area" ? "bg-muted text-primary" : "text-muted-foreground"
//                 )}
//                 onClick={() => setChartType("area")}
//               >
//                 <TrendingUp className="h-4 w-4" />
//                 <span className="sr-only">Area Chart</span>
//               </Button>
//             </div>
//             <Select value={timeRange} onValueChange={setTimeRange}>
//               <SelectTrigger className="w-28 h-8">
//                 <SelectValue placeholder="Time Range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="daily">Daily</SelectItem>
//                 <SelectItem value="weekly">Weekly</SelectItem>
//                 <SelectItem value="monthly">Monthly</SelectItem>
//                 <SelectItem value="yearly">Yearly</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-4">{renderChart()}</CardContent>
//     </Card>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Line,
  LineChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart2, LineChart as LineChartIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  type?: "bar" | "line" | "area";
  dataKey: string;
  height?: number;
}

const categories = [
  'Connections Count',
  'No of Leads Identified',
  'Connections Sent',
  'Messages Sent',
  'Follow Ups',
  'Scheduled Meetings',
  'InMail Count',
  'Postings',
];

export function ChartCard({
  title,
  description,
  data,
  type = "bar",
  dataKey,
  height = 300,
}: ChartCardProps) {
  const [selectedAccount, setSelectedAccount] = useState(data[0]?.name || 'Client A');
  const [chartType, setChartType] = useState(type);
  const isMobile = useIsMobile();
  const laptop = useMediaQuery("(min-width: 1300px) ");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
  };

  const selectedAccountData = data.find(account => account.name === selectedAccount);

  const formattedData = selectedAccountData
    ? selectedAccountData.data[0].data.map((value, index) => ({
      name: (
        ["Connections Count","Connections Sent","Scheduled Meetings"].includes(categories[index])
      ) ? categories[index].split(" ")[1] : categories[index],
        [dataKey]: value,
      }))
    : [];

  console.log("Formatted Data:", formattedData.map(item => item.name));  

  const renderChart = () => {
    const showLabels = laptop;
    if (!isClient) {
      return null;
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
              interval={showLabels ? 'preserveEnd' : 'preserveStart'}
              tickFormatter={(value) => {
                if (!showLabels) return '';
                return value;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => categories[formattedData.findIndex(item => item.name === label)]}
            />
            <Bar
              dataKey={dataKey}
              fill="url(#colorBar)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
             <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
              interval={showLabels ? 'preserveEnd' : 'preserveStart'}
              tickFormatter={(value) => {
                if (!showLabels) return '';
                return value;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => categories[formattedData.findIndex(item => item.name === label)]}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorArea)"
              strokeWidth={2}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
           <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
              interval={showLabels ? 'preserveEnd' : 'preserveStart'}
              tickFormatter={(value) => {
                if (!showLabels) return '';
                return value;
              }}
            />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }}
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => categories[formattedData.findIndex(item => item.name === label)]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ strokeWidth: 0, fill: "hsl(var(--primary))", r: 3 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="overflow-hidden border-border/40 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/90">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">{title}</CardTitle>
            {description && <CardDescription className="text-sm">{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-r-none border-r-0",
                  chartType === "bar" ? "bg-muted text-primary" : "text-muted-foreground"
                )}
                onClick={() => setChartType("bar")}
              >
                <BarChart2 className="h-4 w-4" />
                <span className="sr-only">Bar Chart</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-none border-x-0",
                  chartType === "line" ? "bg-muted text-primary" : "text-muted-foreground"
                )}
                onClick={() => setChartType("line")}
              >
                <LineChartIcon className="h-4 w-4" />
                <span className="sr-only">Line Chart</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-l-none border-l-0",
                  chartType === "area" ? "bg-muted text-primary" : "text-muted-foreground"
                )}
                onClick={() => setChartType("area")}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="sr-only">Area Chart</span>
              </Button>
            </div>
            <Select value={selectedAccount} onValueChange={handleAccountChange}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {data.map(account => (
                  <SelectItem key={account.name} value={account.name}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{renderChart()}</CardContent>
    </Card>
  );
}
