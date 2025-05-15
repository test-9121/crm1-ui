
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DealStats, Deal } from '../types';
import { PieChart, BarChart, ResponsiveContainer, Pie, Bar, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/format-number';

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
  ).map(([stage, value]) => ({
    name: stage.replace('_', ' '),
    value,
    color: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] || '#94a3b8',
  }));

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stageDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} deals`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Value by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valueByStage}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Value']} />
                  <Bar dataKey="value">
                    {valueByStage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
