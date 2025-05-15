
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DealStats } from '../types';
import { formatCurrency } from '@/utils/format-number';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DollarSign, TrendingUp, Award, LineChart, PieChart as PieChartIcon } from 'lucide-react';

interface DealAnalyticsProps {
  stats: DealStats;
  isLoading: boolean;
  deals: any[];
}

export const DealAnalytics: React.FC<DealAnalyticsProps> = ({ stats, isLoading, deals }) => {
  // Generate data for stage distribution
  const stageData = [
    { name: 'Lead', count: deals.filter(d => d.stage === 'LEAD').length },
    { name: 'Discovery', count: deals.filter(d => d.stage === 'DISCOVERY').length },
    { name: 'Proposal', count: deals.filter(d => d.stage === 'PROPOSAL').length },
    { name: 'Negotiation', count: deals.filter(d => d.stage === 'NEGOTIATION').length },
    { name: 'Closed Won', count: deals.filter(d => d.stage === 'CLOSED_WON').length },
    { name: 'Closed Lost', count: deals.filter(d => d.stage === 'CLOSED_LOST').length },
  ];

  // Generate data for value by stage
  const valueByStageData = [
    { name: 'Lead', value: deals.filter(d => d.stage === 'LEAD').reduce((sum, deal) => sum + deal.value, 0) },
    { name: 'Discovery', value: deals.filter(d => d.stage === 'DISCOVERY').reduce((sum, deal) => sum + deal.value, 0) },
    { name: 'Proposal', value: deals.filter(d => d.stage === 'PROPOSAL').reduce((sum, deal) => sum + deal.value, 0) },
    { name: 'Negotiation', value: deals.filter(d => d.stage === 'NEGOTIATION').reduce((sum, deal) => sum + deal.value, 0) },
    { name: 'Closed Won', value: deals.filter(d => d.stage === 'CLOSED_WON').reduce((sum, deal) => sum + deal.value, 0) },
  ];

  // Generate data for deal sources
  const sourcesData = [
    { name: 'Website', value: deals.filter(d => d.source === 'WEBSITE').length },
    { name: 'Referral', value: deals.filter(d => d.source === 'REFERRAL').length },
    { name: 'Cold Call', value: deals.filter(d => d.source === 'COLD_CALL').length },
    { name: 'Email', value: deals.filter(d => d.source === 'EMAIL').length },
    { name: 'Social Media', value: deals.filter(d => d.source === 'SOCIAL_MEDIA').length },
    { name: 'Event', value: deals.filter(d => d.source === 'EVENT').length },
    { name: 'Other', value: deals.filter(d => d.source === 'OTHER').length },
  ].filter(item => item.value > 0);

  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#22C55E', '#EAB308', '#EC4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalPipelineValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {deals.filter(d => d.status === 'ACTIVE').length} active deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Pipeline</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.weightedPipelineValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on probability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Won This Month</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.dealsWonThisMonth.value)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.dealsWonThisMonth.count} deals closed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgDealSize.value)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={stats.avgDealSize.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {stats.avgDealSize.percentChange > 0 ? '+' : ''}
                {stats.avgDealSize.percentChange}%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Deal Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value} deals`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Value by Stage</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={valueByStageData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
              <Bar dataKey="value" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealAnalytics;
