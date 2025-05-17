

import type { FC } from 'react';
import { useState, useEffect, useId } from "react";
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
  Cell,
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

// Data structure for charts with account selection
export interface AccountChartData {
  name: string; // Account name
  data: Array<{
    name: string; // Typically same as account name or a sub-category
    data: number[]; // Values for the categories
    group?: string;
  }>;
}

// Data structure for simpler charts without account selection
export interface SimplifiedChartDataItem {
  name: string; // For x-axis category and tooltip
  [dataKey: string]: number | string; // The value for the bar/line/area, identified by dataKey
  fill?: string; // HSL string for bar color
}

export interface ChartCardProps {
  title: string;
  description?: string;
  data: AccountChartData[] | SimplifiedChartDataItem[];
  type?: "bar" | "line" | "area";
  dataKey: string;
  height?: number;
  showAccountSelector?: boolean;
  showChartTypeSwitcher?: boolean;
  yAxisTickFormatter?: (value: number) => string;
  hideXAxisLabels?: boolean;
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

const formatAxisName = (name: string): string => {
  const words = name.split(" ");
  if (words.length > 2 && name.length > 15) {
    return words.slice(0, Math.ceil(words.length / 2)).join(" ") + "\n" + words.slice(Math.ceil(words.length / 2)).join(" ");
  } else if (words.length > 1 && name.length > 10) {
     return words[0] + "\n" + words.slice(1).join(" ");
  }
  return name;
};

export const ChartCard: FC<ChartCardProps> = ({
  title,
  description,
  data,
  type = "bar",
  dataKey,
  height = 300,
  showAccountSelector = true,
  showChartTypeSwitcher = true,
  yAxisTickFormatter,
  hideXAxisLabels = false,
}) => {
  const chartInstanceId = useId();
  const initialAccountName = (data as AccountChartData[])[0]?.name || '';
  const [selectedAccount, setSelectedAccount] = useState('Client A');
  const [chartType, setChartType] = useState(type);
  const isMobile = useIsMobile();
  const laptop = useMediaQuery("(min-width: 1300px) ");
  const [isClient, setIsClient] = useState(false);
  const [shouldHideXAxisLabels, setShouldHideXAxisLabels] = useState(hideXAxisLabels);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!showChartTypeSwitcher) {
      setChartType(type);
    }
  }, [type, showChartTypeSwitcher]);

  useEffect(() => {
    if (isClient) {
      const calculatedHideLabels = !laptop || hideXAxisLabels; 
      setShouldHideXAxisLabels(calculatedHideLabels);
    }
  }, [isClient, laptop, hideXAxisLabels, data]);


  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
  };

  let chartDataToDisplay: SimplifiedChartDataItem[];

  if (showAccountSelector && Array.isArray(data) && (data as AccountChartData[])[0]?.data?.[0]?.data) {
    const accountData = data as AccountChartData[];
    const currentAccountData = accountData.find(acc => acc.name === selectedAccount);
    chartDataToDisplay = currentAccountData
      ? currentAccountData.data[0].data.map((value, index) => ({
          name: categories[index],
          [dataKey]: value,
          fill: `hsl(var(--primary))`, 
        }))
      : [];
  } else {
    chartDataToDisplay = data as SimplifiedChartDataItem[];
  }
  
  const renderChart = () => {
    if (!isClient) {
      return <div style={{ height: `${height}px` }} className="w-full flex items-center justify-center text-muted-foreground">Loading chart...</div>;
    }
    
    const commonXAxisProps = {
      dataKey: "name",
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 10, lineHeight: "12px" },
      stroke: "hsl(var(--muted-foreground))",
      interval: 0,
      height: shouldHideXAxisLabels ? 20 : 70, 
      tickFormatter: (value: string) => {
        if (shouldHideXAxisLabels) return '';
        return formatAxisName(value);
      }
    };

    const commonYAxisProps = {
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 10 },
      stroke: "hsl(var(--muted-foreground))",
      tickFormatter: yAxisTickFormatter,
    };

    const commonTooltipProps = {
      contentStyle: {
        backgroundColor: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
      },
      formatter: (value: number, nameKeyTooltip: string, props: any) => [value, props.payload.name], 
      labelFormatter: (label: string, payload: any[]) => {
        if (payload && payload.length > 0) {
          return payload[0].payload.name;
        }
        return label;
      }
    };
    
    const chartMargin = { top: 10, right: 10, left: yAxisTickFormatter ? -10 : -20, bottom: shouldHideXAxisLabels ? 5 : 30 };


    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartDataToDisplay} margin={chartMargin}>
            <defs>
              {chartDataToDisplay.map((entry, index) => (
                <linearGradient key={`gradient-${chartInstanceId}-${index}`} id={`gradientFill-${chartInstanceId}-${index}`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="5%" stopColor={entry.fill || 'hsl(var(--primary))'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={entry.fill || 'hsl(var(--primary))'} stopOpacity={0.9} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip {...commonTooltipProps} />
            <Bar dataKey={dataKey} animationDuration={1500} radius={[4, 4, 0, 0]}>
              {chartDataToDisplay.map((entry, index) => (
                <Cell key={`cell-${chartInstanceId}-${index}`} fill={`url(#gradientFill-${chartInstanceId}-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartDataToDisplay} margin={chartMargin}>
            <defs>
              <linearGradient id={`colorArea-${chartInstanceId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip {...commonTooltipProps} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill={`url(#colorArea-${chartInstanceId})`}
              strokeWidth={2}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    // Line Chart
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartDataToDisplay} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" strokeOpacity={0.2} />
          <XAxis {...commonXAxisProps} />
          <YAxis {...commonYAxisProps} />
          <Tooltip {...commonTooltipProps} />
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
            {showChartTypeSwitcher && (
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-r-none border-r-0",
                    chartType === "bar" ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setChartType("bar")}
                  aria-label="Switch to Bar Chart"
                >
                  <BarChart2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-none border-x-0",
                    chartType === "line" ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setChartType("line")}
                   aria-label="Switch to Line Chart"
                >
                  <LineChartIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-l-none border-l-0",
                    chartType === "area" ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setChartType("area")}
                  aria-label="Switch to Area Chart"
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            )}
             {showAccountSelector && Array.isArray(data) && (data as AccountChartData[])[0]?.data?.[0]?.data && (
              <Select value={selectedAccount} onValueChange={handleAccountChange}>
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  {(data as AccountChartData[]).map(account => (
                    <SelectItem key={account.name} value={account.name}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{renderChart()}</CardContent>
    </Card>
  );
}
