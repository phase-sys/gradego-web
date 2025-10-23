import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClassDataStore } from '@/store/classDataStore';
import { useClassStore } from '@/store/classStore';

const AttendanceSummaryChart: React.FC = () => {
  const { attendance } = useClassDataStore();
  const { activeClassId } = useClassStore();

  // Mock: Filter attendance records for the active class (assuming classId 1)
  const classAttendance = activeClassId === 1 ? attendance : [];
  
  const summary = classAttendance.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'Present', count: summary.present || 0, color: 'hsl(142.1 76.2% 36.3%)' }, // Green
    { name: 'Late', count: summary.late || 0, color: 'hsl(48 96% 50%)' }, // Yellow
    { name: 'Absent', count: summary.absent || 0, color: 'hsl(0 84.2% 60.2%)' }, // Red
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="h-64 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} allowDecimals={false} />
            <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="count" name="Records" fill="hsl(var(--primary))">
                {data.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={entry.color} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummaryChart;