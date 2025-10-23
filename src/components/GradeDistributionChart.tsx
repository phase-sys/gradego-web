import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockGradeData = [
  { name: 'A (90-100)', value: 12, color: 'hsl(142.1 76.2% 36.3%)' }, // Green
  { name: 'B (80-89)', value: 8, color: 'hsl(217.2 91.2% 59.8%)' }, // Blue
  { name: 'C (70-79)', value: 5, color: 'hsl(48 96% 50%)' }, // Yellow
  { name: 'D (60-69)', value: 2, color: 'hsl(30 98% 50%)' }, // Orange
  { name: 'F (<60)', value: 1, color: 'hsl(0 84.2% 60.2%)' }, // Red
];

const GradeDistributionChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-64 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockGradeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {mockGradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GradeDistributionChart;