
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DealStats, Deal } from '../types';
import { PieChart, BarChart, ResponsiveContainer, Pie, Bar, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/format-number';
import { ChartCard } from '@/modules/common/ChartCard';

interface DealAnalyticsProps {
  stats: DealStats;
  deals: Deal[];
  isLoading: boolean;
}

const STAGE_COLORS = {
  PROSPECTING: '#60a5fa',
  LEAD: '#818cf8',
  DISCOVERY: '#a78bfa',
  PROPOSAL: '#c084fc',
  NEGOTIATION: '#f472b6',
  CLOSED_WON: '#34d399',
  CLOSED_LOST: '#f87171',
};

const DealAnalytics: React.FC<DealAnalyticsProps> = ({ stats, deals, isLoading }) => {
  // Calculate stage distribution
  const stageDistribution = Object.entries(
    deals.reduce((acc, deal) => {
      acc[deal.stage] = (acc[deal.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([stage, count]) => ({
    name: stage.replace('_', ' '),
    value: count,
    color: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] || '#94a3b8',
  }));

  // Calculate value by stage
  const valueByStage = Object.entries(
    deals.reduce((acc, deal) => {
      acc[deal.stage] = (acc[deal.stage] || 0) + deal.value;
      return acc;
    }, {} as Record<string, number>)
  ).map(([stage, data]) => ({
    name: stage.replace('_', ' '),
    data,
    fill: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] || '#94a3b8',
  }));


  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  const valueByStageYAxisFormatter = (value: number) => {
    if (value === 0) return '$0';
    return `$${value / 1000}k`;
  };

  //PI CHART
  const totalValue = stageDistribution.reduce((sum, entry) => sum + entry.value, 0);
  const chartData = stageDistribution.map(entry => ({
    ...entry,
    percentage: parseFloat(((entry.value / totalValue) * 100).toFixed(0))
  }));
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, color, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const labelRadius = outerRadius * 1.2; // Position labels outside the pie
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px" fontWeight="medium">
        {`${name} ${value}%`}
      </text>
    );
  };


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-lg">
          <p style={{ color: data.color }} className="font-semibold">{`${data.name}: ${data.value} (${data.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center items-center mt-4 gap-x-4 gap-y-2">
        {
          payload.map((entry: any, index: number) => (
            <li key={`item-${index}`} className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span style={{ backgroundColor: entry.color }} className="w-3 h-3 inline-block rounded-sm"></span>
              <span>{entry.value}</span>
            </li>
          ))
        }
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">

        <Card className="overflow-hidden border-border/40 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentage" // Data key for pie slice calculation, label uses `value` which is percentage
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={renderLegend} verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <ChartCard
          title="Value by Stage"
          description="Pipeline value distribution by sales stage."
          data={valueByStage}
          dataKey="data"
          type="bar"
          showAccountSelector={false}
          showChartTypeSwitcher={false}
          yAxisTickFormatter={valueByStageYAxisFormatter}
          hideXAxisLabels={false} // Show X-axis labels for this chart initially, logic inside component will adjust
          height={350}
        />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Deals</div>
                <div className="text-2xl font-bold">{stats.totalDeals}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pipeline Value</div>
                <div className="text-2xl font-bold">{formatCurrency(stats.totalPipelineValue)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
                <div className="text-2xl font-bold">{formatCurrency(stats.weightedPipelineValue)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg Deal Size</div>
                <div className="text-2xl font-bold">{formatCurrency(stats.avgDealSize.value)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealAnalytics;
