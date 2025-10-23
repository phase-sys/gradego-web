import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockData = [
  { name: 'Quiz 1', score: 75 },
  { name: 'HW 1', score: 88 },
  { name: 'Quiz 2', score: 79 },
  { name: 'Exam 1', score: 65 },
  { name: 'HW 2', score: 92 },
  { name: 'Quiz 3', score: 85 },
];

const ClassPerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Performance Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-64 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={[0, 100]} />
            <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClassPerformanceChart;